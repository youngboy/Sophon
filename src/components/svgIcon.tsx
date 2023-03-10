export default function SvgIcons() {
  return (
    <div className="hidden" aria-hidden>
      <svg>
        <symbol id="bot">
          <rect x="3" y="11" width="18" height="10" rx="2"></rect>
          <circle cx="12" cy="5" r="2"></circle>
          <path d="M12 7v4"></path>
          <line x1="8" y1="16" x2="8" y2="16"></line>
          <line x1="16" y1="16" x2="16" y2="16"></line>
        </symbol>
        <symbol id="activity">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </symbol>
        <symbol id="sheet">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="3" y1="15" x2="21" y2="15"></line>
          <line x1="9" y1="9" x2="9" y2="21"></line>
          <line x1="15" y1="9" x2="15" y2="21"></line>
        </symbol>
        <symbol id="chart">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </symbol>
        <symbol id="flame">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
        </symbol>
        <symbol id="ghost">
          <path d="M9 10h.01"></path>
          <path d="M15 10h.01"></path>
          <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"></path>
        </symbol>
        <symbol id="enter">
          <polyline points="9 10 4 15 9 20"></polyline>
          <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
        </symbol>
        <symbol id="chevron-down">
          <polyline points="6 9 12 15 18 9"></polyline>
        </symbol>
      </svg>
    </div>
  )
}
