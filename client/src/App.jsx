import { useEffect, useRef, useState } from 'react'
import './App.css'

import { parseCommand } from './utils/commandParser'
import EVENT_CONFIG from './config/eventConfig'

import resolveCommand, {
  getCommandSuggestions,
} from './utils/commandResolver'

import getClosestCommands from './utils/commandSuggestions'
import normalizeOutput from './terminal/normalizeOutput'
import AnimatedOutput from './terminal/AnimatedOutput'
import ExecutionIndicator from './terminal/ExecutionIndicator'
import { getCommandBehavior } from './commands/commandBehavior'

function App() {
  const [history, setHistory] = useState([])
  const [command, setCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const [bootLines, setBootLines] = useState([])
  const [isExecuting, setIsExecuting] = useState(false)

  const terminalBodyRef = useRef(null)
  const inputRef = useRef(null)
  const terminalAppRef = useRef(null)

  // --------------------------------------------------
  // BOOT SEQUENCE
  // --------------------------------------------------

  const BOOT_SEQUENCE = [
    {
      text: 'Initializing EventShell Runtime...',
      delay: 500,
    },
    {
      text: 'Loading terminal modules............. OK',
      delay: 700,
    },
    {
      text: 'Loading event engine................. OK',
      delay: 700,
    },
    {
      text: 'Connecting to event database......... OK',
      delay: 800,
    },
    {
      text: 'Verifying event credentials.......... OK',
      delay: 700,
    },
    {
      text: 'Establishing secure session.......... OK',
      delay: 800,
    },
  ]

  // --------------------------------------------------
  // BOOT SEQUENCE EFFECT
  // --------------------------------------------------

  useEffect(() => {
    let cancelled = false
    let totalDelay = 0

    const timers = []

    BOOT_SEQUENCE.forEach((line) => {
      totalDelay += line.delay

      const timer = setTimeout(() => {
        if (cancelled) return

        setBootLines((previousLines) => [
          ...previousLines,
          line.text,
        ])
      }, totalDelay)

      timers.push(timer)
    })

    const finishTimer = setTimeout(() => {
      if (!cancelled) {
        setIsBooting(false)
      }
    }, totalDelay + 700)

    timers.push(finishTimer)

    return () => {
      cancelled = true

      timers.forEach((timer) => {
        clearTimeout(timer)
      })
    }
  }, [])

  // --------------------------------------------------
  // AUTO SCROLL
  // --------------------------------------------------

  useEffect(() => {
    terminalBodyRef.current?.scrollTo({
      top: terminalBodyRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [history, isExecuting])

  // --------------------------------------------------
  // COMMAND EXECUTION
  // --------------------------------------------------

  const executeCommand = async (value) => {
    if (isExecuting) {
      return
    }

    const parsedCommand = parseCommand(value)

    if (!parsedCommand.command) {
      return
    }

    const trimmedCommand = parsedCommand.raw

    // --------------------------------------------------
    // COMMAND HISTORY
    // --------------------------------------------------

    const newCommandHistory = [
      ...commandHistory,
      trimmedCommand,
    ]

    setCommandHistory(newCommandHistory)
    setHistoryIndex(-1)

    // --------------------------------------------------
    // CLEAR COMMAND
    // --------------------------------------------------

    if (parsedCommand.command === 'clear') {
      setHistory([])
      setCommand('')
      return
    }

    // --------------------------------------------------
    // NORMALIZE COMMAND
    // --------------------------------------------------

    const normalizedCommand = parsedCommand.command

    // --------------------------------------------------
    // GET COMMAND BEHAVIOR
    // --------------------------------------------------

    const behavior = getCommandBehavior(
      normalizedCommand,
    )

    // --------------------------------------------------
    // RESOLVE COMMAND
    // --------------------------------------------------

    const resolvedCommand = resolveCommand(
      normalizedCommand,
    )

    const commandData = resolvedCommand?.command

    // --------------------------------------------------
    // VALID COMMAND
    // --------------------------------------------------

    if (commandData) {
      setIsExecuting(true)

      // ------------------------------------------------
      // EXECUTION DELAY
      // ------------------------------------------------

      await new Promise((resolve) => {
        setTimeout(
          resolve,
          behavior.executionDelay,
        )
      })

      try {
        // ----------------------------------------------
        // EXECUTE COMMAND
        // ----------------------------------------------

        const commandOutput = commandData.execute({
          arguments: parsedCommand.arguments,
          argumentText: parsedCommand.argumentText,
        })

        // ----------------------------------------------
        // NORMALIZE OUTPUT
        // ----------------------------------------------

        const normalizedOutput = normalizeOutput(
          commandOutput,
          'success',
        )

        // ----------------------------------------------
        // ADD OUTPUT TO HISTORY
        // ----------------------------------------------

        setHistory((previousHistory) => [
          ...previousHistory,
          {
            command: trimmedCommand,
            output: normalizedOutput.lines,
            type: normalizedOutput.type,

            // Command-specific animation speed
            animationSpeed:
              behavior.animationSpeed,
          },
        ])
      } catch (error) {
        console.error(
          'Command execution error:',
          error,
        )

        setHistory((previousHistory) => [
          ...previousHistory,
          {
            command: trimmedCommand,
            output: [
              'COMMAND EXECUTION ERROR',
              '',
              'An unexpected error occurred while executing this command.',
            ],
            type: 'error',
            animationSpeed:
              behavior.animationSpeed,
          },
        ])
      }

      // ----------------------------------------------
      // EXECUTION COMPLETE
      // ----------------------------------------------

      setIsExecuting(false)
      setCommand('')

      return
    }

    // --------------------------------------------------
    // COMMAND NOT FOUND
    // --------------------------------------------------

    setIsExecuting(true)

    await new Promise((resolve) => {
      setTimeout(
        resolve,
        behavior.executionDelay,
      )
    })

    const suggestions = getClosestCommands(
      normalizedCommand,
    )

    const output = [
      'COMMAND NOT FOUND',
      '',
      `Command : ${normalizedCommand}`,
    ]

    if (suggestions.length > 0) {
      output.push(
        '',
        'Did you mean:',
        ...suggestions.map(
          (suggestion) =>
            `  ${suggestion}`,
        ),
      )
    }

    setHistory((previousHistory) => [
      ...previousHistory,
      {
        command: trimmedCommand,
        output,
        type: 'error',
        animationSpeed:
          behavior.animationSpeed,
      },
    ])

    setIsExecuting(false)
    setCommand('')
  }

  // --------------------------------------------------
  // FORM SUBMIT
  // --------------------------------------------------

  const handleSubmit = (event) => {
    event.preventDefault()

    if (isExecuting) {
      return
    }

    executeCommand(command)
  }

  // --------------------------------------------------
  // KEYBOARD CONTROLS
  // --------------------------------------------------

  const handleKeyDown = (event) => {
    if (isExecuting) {
      return
    }

    // ------------------------------------------------
    // ARROW UP
    // ------------------------------------------------

    if (event.key === 'ArrowUp') {
      event.preventDefault()

      if (commandHistory.length === 0) {
        return
      }

      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(historyIndex - 1, 0)

      setHistoryIndex(nextIndex)

      setCommand(
        commandHistory[nextIndex],
      )

      return
    }

    // ------------------------------------------------
    // ARROW DOWN
    // ------------------------------------------------

    if (event.key === 'ArrowDown') {
      event.preventDefault()

      if (historyIndex === -1) {
        return
      }

      const nextIndex =
        historyIndex + 1

      if (
        nextIndex >=
        commandHistory.length
      ) {
        setHistoryIndex(-1)
        setCommand('')
        return
      }

      setHistoryIndex(nextIndex)

      setCommand(
        commandHistory[nextIndex],
      )

      return
    }

    // ------------------------------------------------
    // TAB COMPLETION
    // ------------------------------------------------

    if (event.key === 'Tab') {
      event.preventDefault()

      const currentInput =
        command.trim().toLowerCase()

      if (!currentInput) {
        return
      }

      const matches =
        getCommandSuggestions(
          currentInput,
        )

      // ----------------------------------------------
      // NO MATCH
      // ----------------------------------------------

      if (matches.length === 0) {
        return
      }

      // ----------------------------------------------
      // AUTO COMPLETE
      //
      // If one command matches:
      //
      // event.in + TAB
      //       ↓
      // event.info
      //
      // If multiple commands match:
      //
      // event.dat + TAB
      //       ↓
      // event.data
      //
      // The first matching command is automatically
      // selected instead of displaying suggestions.
      // ----------------------------------------------

      setCommand(matches[0])
      setHistoryIndex(-1)

      return
    }
  }

  // --------------------------------------------------
  // TERMINAL FOCUS
  // --------------------------------------------------

  const focusTerminal = () => {
    inputRef.current?.focus()
  }

  // --------------------------------------------------
  // FULLSCREEN
  // --------------------------------------------------

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await terminalAppRef.current?.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error(
        'Fullscreen error:',
        error,
      )
    }
  }

  // --------------------------------------------------
  // FULLSCREEN STATE
  // --------------------------------------------------

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        Boolean(
          document.fullscreenElement,
        ),
      )
    }

    document.addEventListener(
      'fullscreenchange',
      handleFullscreenChange,
    )

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange,
      )
    }
  }, [])

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <main
      className="terminal-app"
      ref={terminalAppRef}
      onClick={focusTerminal}
    >
      <section className="terminal-window">

        {/* -------------------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------------------- */}

        <header className="terminal-header">
          <div className="terminal-controls">
            <span className="terminal-dot dot-red" />
            <span className="terminal-dot dot-yellow" />
            <span className="terminal-dot dot-green" />
          </div>

          <div className="terminal-title">
            EventShell Terminal
          </div>

          <div className="terminal-version">
            v0.1.0
          </div>
        </header>

        {/* -------------------------------------------- */}
        {/* TERMINAL BODY */}
        {/* -------------------------------------------- */}

        <div
          className="terminal-body"
          ref={terminalBodyRef}
        >

          {/* ------------------------------------------ */}
          {/* SYSTEM INTRO / BOOT */}
          {/* ------------------------------------------ */}

          <div className="system-intro">

            <div className="boot-title">
              EVENTSHELL TERMINAL
            </div>

            <div>
              Interactive Event Experience Platform
            </div>

            <div className="intro-line">
              --------------------------------------------------
            </div>

            {bootLines.map(
              (line, index) => (
                <div
                  className="boot-line"
                  key={`${line}-${index}`}
                >
                  <span className="boot-prefix">
                    &gt;
                  </span>{' '}
                  {line}
                </div>
              ),
            )}

            {!isBooting && (
              <>
                <div className="boot-success">
                  Connection established.
                </div>

                <div className="boot-success">
                  Welcome to EventShell.
                </div>

                <div className="intro-help">
                  Type{' '}
                  <span>
                    "help"
                  </span>{' '}
                  to see available
                  commands.
                </div>
              </>
            )}
          </div>

          {/* ------------------------------------------ */}
          {/* COMMAND HISTORY */}
          {/* ------------------------------------------ */}

          {history.map(
            (item, index) => (
              <div
                className="command-block"
                key={`${item.command}-${index}`}
              >

                {/* ------------------------------------ */}
                {/* ENTERED COMMAND */}
                {/* ------------------------------------ */}

                <div className="command-line">

                  <span className="prompt">
                    {
                      EVENT_CONFIG
                        .terminal
                        .username
                    }
                    @
                    {
                      EVENT_CONFIG
                        .terminal
                        .hostname
                    }
                    :~$
                  </span>

                  <span className="entered-command">
                    {item.command}
                  </span>

                </div>

                {/* ------------------------------------ */}
                {/* COMMAND OUTPUT */}
                {/* ------------------------------------ */}

                <div
                  className={`command-output ${item.type === 'error'
                      ? 'output-error'
                      : ''
                    }`}
                >
                  <AnimatedOutput
                    lines={item.output}
                    type={item.type}
                    speed={
                      item.animationSpeed ||
                      120
                    }
                  />
                </div>

              </div>
            ),
          )}

          {/* ------------------------------------------ */}
          {/* EXECUTION INDICATOR */}
          {/* ------------------------------------------ */}

          {!isBooting && (
            <ExecutionIndicator
              active={isExecuting}
            />
          )}

          {/* ------------------------------------------ */}
          {/* COMMAND INPUT */}
          {/* ------------------------------------------ */}

          {!isBooting && (
            <>
              <form
                className="command-form"
                onSubmit={handleSubmit}
              >

                <span className="prompt">
                  {
                    EVENT_CONFIG
                      .terminal
                      .username
                  }
                  @
                  {
                    EVENT_CONFIG
                      .terminal
                      .hostname
                  }
                  :~$
                </span>

                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(event) =>
                    setCommand(
                      event.target.value,
                    )
                  }
                  onKeyDown={handleKeyDown}
                  autoFocus
                  spellCheck="false"
                  autoComplete="off"
                  aria-label="Terminal command"
                  disabled={isExecuting}
                />

              </form>

              {/* ---------------------------------------- */}
              {/* COMMAND SUGGESTIONS */}
              {/* ---------------------------------------- */}

              {command.trim() &&
                !isExecuting &&
                getCommandSuggestions(
                  command,
                ).length > 0 && (
                  <div className="command-suggestions">

                    <div className="suggestion-label">
                      Suggestions
                    </div>

                    {getCommandSuggestions(
                      command,
                    ).map(
                      (suggestion) => {

                        const suggestionCommand =
                          resolveCommand(
                            suggestion,
                          )?.command

                        return (
                          <div
                            className="suggestion-item"
                            key={suggestion}
                          >

                            <span className="suggestion-arrow">
                              └─
                            </span>

                            <span className="suggestion-command">
                              {suggestion}
                            </span>

                            <span className="suggestion-description">
                              {
                                suggestionCommand
                                  ?.description ||
                                'Command alias'
                              }
                            </span>

                          </div>
                        )
                      },
                    )}

                  </div>
                )}

            </>
          )}

        </div>

        {/* -------------------------------------------- */}
        {/* FOOTER */}
        {/* -------------------------------------------- */}

        <footer className="terminal-footer">

          <span>
            EVENTSHELL
          </span>

          <span>
            &copy; 2026 EventShell.
            All rights reserved.
          </span>

          <div className="terminal-footer-right">

            <span>
              TERMINAL ONLINE
            </span>

            <button
              type="button"
              className="fullscreen-button"
              onClick={(event) => {
                event.stopPropagation()
                toggleFullscreen()
              }}
              title={
                isFullscreen
                  ? 'Exit Fullscreen'
                  : 'Fullscreen'
              }
              aria-label={
                isFullscreen
                  ? 'Exit Fullscreen'
                  : 'Enter Fullscreen'
              }
            >
              ⛶
            </button>

          </div>

        </footer>

      </section>
    </main>
  )
}

export default App