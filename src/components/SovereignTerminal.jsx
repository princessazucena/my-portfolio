import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal, faXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { TERMINAL_COMMANDS, PERSONAL_INFO } from '../utils/constants';
import { soundFx } from '../utils/audio';

export default function SovereignTerminal({ isOpen, onClose, triggerToast }) {
  const [history, setHistory] = useState([
    { type: 'system', text: '== SOVEREIGN CONSOLE v2.6.4 [ARCHITECT EDITION] ==' },
    { type: 'system', text: `Authorized Identity: ${PERSONAL_INFO.name} (${PERSONAL_INFO.location})` },
    { type: 'system', text: 'Type "help" to display available commands, or click the quick command chips below.' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    soundFx.playClick();

    const newHistory = [...history, { type: 'user', text: `$ ${rawCmd}` }];
    setCommandHistory(prev => [rawCmd, ...prev]);
    setHistoryIndex(-1);

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (TERMINAL_COMMANDS[cmd]) {
      newHistory.push({ type: 'output', text: TERMINAL_COMMANDS[cmd] });
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not recognized: "${rawCmd}". Type "help" for a list of available commands.`
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const chips = ['help', 'about', 'projects', 'skills', 'education', 'contact', 'socials'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-black border border-zinc-800 overflow-hidden shadow-2xl flex flex-col h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-950 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose}></span>
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <FontAwesomeIcon icon={faTerminal} className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xs font-sans font-medium text-zinc-300">
                sovereign@azucena-system:~
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-zinc-950/60 border-b border-zinc-800 overflow-x-auto text-xs font-sans">
          <span className="text-zinc-500 shrink-0">Commands:</span>
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => executeCommand(chip)}
              className="px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:text-white text-zinc-400 transition-colors shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Output */}
        <div className="flex-1 p-5 overflow-y-auto font-sans text-xs sm:text-sm space-y-2 leading-relaxed">
          {history.map((item, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {item.type === 'user' ? (
                <span className="text-white font-medium">{item.text}</span>
              ) : item.type === 'system' ? (
                <span className="text-zinc-500">{item.text}</span>
              ) : item.type === 'error' ? (
                <span className="text-red-400">{item.text}</span>
              ) : (
                <span className="text-zinc-300">{item.text}</span>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3.5 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2.5">
          <span className="font-sans text-xs text-emerald-400 font-medium shrink-0">
            azucena:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command here (e.g. projects, skills, contact)..."
            className="flex-1 bg-transparent font-sans text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => executeCommand(input)}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
