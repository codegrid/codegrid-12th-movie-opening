export const BLOCK_SIZE = 40

// テトリミノの1辺の最長
export const TET_SIZE = 4

export const ONE_DURATION = 12

export const COLORS = {
  I: "#9ADCFF",
  O: "#FFF89A",
  T: "#B1AFFF",
  S: "#C9F4AA",
  Z: "#FF8AAE",
  J: "#00A9FF",
  L: "#FFCF96"
}

export const TETROMINOS = {
  I: {
    default: [[3], [3], [3], [3]],
    rotateR: [[3, 3, 3, 3]],
    rotateL: [[3, 3, 3, 3]]
  },
  O: {
    default: [
      [7, 7],
      [7, 7]
    ],
    rotateR: [
      [7, 7],
      [7, 7]
    ],
    rotateL: [
      [7, 7],
      [7, 7]
    ]
  },
  T: {
    default: [
      [0, 6, 0],
      [6, 6, 6]
    ],
    rotateR: [
      [6, 0],
      [6, 6],
      [6, 0]
    ],
    rotateL: [
      [0, 6],
      [6, 6],
      [0, 6]
    ],
    inverse: [
      [6, 6, 6],
      [0, 6, 0]
    ]
  },
  S: {
    default: [
      [0, 2, 2],
      [2, 2, 0]
    ],
    rotateR: [
      [2, 0],
      [2, 2],
      [0, 2]
    ],
    rotateL: [
      [0, 2],
      [2, 2],
      [2, 0]
    ],
    inverse: [
      [2, 2, 0],
      [0, 2, 2]
    ]
  },
  Z: {
    default: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    rotateR: [
      [0, 1],
      [1, 1],
      [1, 0]
    ],
    rotateL: [
      [1, 0],
      [1, 1],
      [0, 1]
    ]
  },
  L: {
    default: [
      [1, 0],
      [1, 0],
      [1, 1]
    ],
    rotateR: [
      [1, 1, 1],
      [1, 0, 0]
    ],
    rotateL: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    inverse: [
      [1, 1],
      [0, 1],
      [0, 1]
    ]
  },
  J: {
    default: [
      [0, 5],
      [0, 5],
      [5, 5]
    ],
    rotateR: [
      [5, 0, 0],
      [5, 5, 5]
    ],
    rotateL: [
      [5, 5, 5],
      [0, 0, 5]
    ],
    inverse: [
      [5, 5],
      [5, 0],
      [5, 0]
    ]
  }
}

// シナリオ
export const SCENARIO = [
  // 下から1段目
  [
    {
      color: "I",
      startX: 0,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "I",
      startX: 5,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "O",
      startX: 10,
      list: [TETROMINOS.O.default, TETROMINOS.O.rotateR]
    },
    {
      color: "J",
      startX: 12,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR]
    },
    {
      color: "T",
      startX: 15,
      list: [TETROMINOS.T.default, TETROMINOS.T.default]
    },
    {
      color: "L",
      startX: 21,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR]
    },
    {
      color: "I",
      startX: 25,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "Z",
      startX: 32,
      list: [TETROMINOS.S.default, TETROMINOS.S.default]
    },
    {
      color: "J",
      startX: 34,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateL]
    },
    {
      color: "O",
      startX: 37,
      list: [TETROMINOS.O.default, TETROMINOS.O.default]
    },
    {
      color: "I",
      startX: 40,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "J",
      startX: 45,
      list: [TETROMINOS.L.default, TETROMINOS.L.default]
    },
    {
      color: "I",
      startX: 47,
      list: [TETROMINOS.I.default, TETROMINOS.I.default]
    }
  ],
  [
    {
      color: "J",
      startX: 4,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateR]
    },
    {
      color: "L",
      startX: 7,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateL]
    },
    {
      color: "S",
      startX: 17,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateL, TETROMINOS.S.inverse]
    },
    {
      color: "J",
      startX: 22,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateL]
    },
    {
      color: "Z",
      startX: 28,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.default]
    },
    {
      color: "L",
      startX: 39,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateR]
    },
    {
      color: "L",
      startX: 13,
      endY: 1,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateL]
    },
    {
      color: "T",
      startX: 9,
      endY: 2,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL]
    },
    {
      color: "L",
      startX: 25,
      endY: 1,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR]
    },
    {
      color: "T",
      startX: 34,
      endY: 1,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL, TETROMINOS.T.inverse]
    }
  ],
  [
    {
      color: "T",
      startX: 19,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL]
    },
    {
      color: "T",
      startX: 30,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL, TETROMINOS.T.inverse]
    },
    {
      color: "I",
      startX: 15,
      endY: 3,
      list: [TETROMINOS.I.default, TETROMINOS.I.default]
    },
    {
      color: "S",
      startX: 7,
      endY: 3,
      list: [TETROMINOS.S.default, TETROMINOS.S.default]
    },
    {
      color: "I",
      startX: 22,
      endY: 3,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "J",
      startX: 34,
      endY: 3,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateL]
    }
  ],
  // 下から2段目
  [
    {
      color: "L",
      startX: 0,
      endY: 1,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR]
    },
    {
      color: "T",
      startX: 2,
      endY: 1,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL, TETROMINOS.T.inverse]
    },
    {
      color: "T",
      startX: 7,
      endY: 4,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateR]
    },
    {
      color: "I",
      startX: 20,
      endY: 3,
      list: [TETROMINOS.I.default, TETROMINOS.I.default]
    },
    {
      color: "I",
      startX: 25,
      endY: 4,
      list: [TETROMINOS.I.default, TETROMINOS.I.default]
    },
    {
      color: "I",
      startX: 30,
      endY: 2,
      list: [TETROMINOS.I.default, TETROMINOS.I.default]
    },
    {
      color: "O",
      startX: 32,
      endY: 2,
      list: [TETROMINOS.O.default, TETROMINOS.O.default]
    }
  ],
  // 下から3段目
  [
    {
      color: "Z",
      startX: 0,
      endY: 2,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.rotateL]
    },
    {
      color: "J",
      startX: 2,
      endY: 3,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR]
    },
    {
      color: "Z",
      startX: 8,
      endY: 5,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.default]
    },
    {
      color: "T",
      startX: 20,
      endY: 7,
      list: [TETROMINOS.T.default, TETROMINOS.T.default]
    },
    {
      color: "L",
      startX: 24,
      endY: 8,
      list: [TETROMINOS.J.default, TETROMINOS.J.default]
    },
    {
      color: "L",
      startX: 28,
      endY: 6,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateL]
    },
    {
      color: "L",
      startX: 32,
      endY: 4,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR]
    }
  ],
  [
    {
      color: "T",
      startX: 0,
      endY: 4,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL, TETROMINOS.T.inverse]
    },
    {
      color: "L",
      startX: 4,
      endY: 2,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateR, TETROMINOS.L.inverse]
    },
    {
      color: "O",
      startX: 7,
      endY: 7,
      list: [TETROMINOS.O.default, TETROMINOS.O.default]
    },
    {
      color: "S",
      startX: 9,
      endY: 6,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateL, TETROMINOS.S.inverse]
    },
    {
      color: "Z",
      startX: 22,
      endY: 7,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.default]
    },
    {
      color: "I",
      startX: 21,
      endY: 9,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "S",
      startX: 25,
      endY: 10,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateR]
    },
    {
      color: "J",
      startX: 27,
      endY: 6,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateR]
    },
    {
      color: "Z",
      startX: 32,
      endY: 5,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.default]
    }
  ],
  [
    {
      color: "J",
      startX: 0,
      endY: 6,
      list: [TETROMINOS.J.default, TETROMINOS.J.default]
    },
    {
      color: "Z",
      startX: 3,
      endY: 4,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.rotateR]
    },
    {
      color: "I",
      startX: 5,
      endY: 5,
      list: [TETROMINOS.I.default, TETROMINOS.I.default]
    },
    {
      color: "Z",
      startX: 11,
      endY: 6,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.default]
    },
    {
      color: "J",
      startX: 20,
      endY: 8,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR, TETROMINOS.J.inverse]
    },
    {
      color: "I",
      startX: 27,
      endY: 8,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "L",
      startX: 34,
      endY: 4,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateL, TETROMINOS.L.inverse]
    }
  ],
  [
    {
      color: "O",
      startX: 2,
      endY: 6,
      list: [TETROMINOS.O.default, TETROMINOS.O.default]
    },
    {
      color: "T",
      startX: 9,
      endY: 8,
      list: [TETROMINOS.T.default, TETROMINOS.T.default]
    },
    {
      color: "T",
      startX: 13,
      endY: 6,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL]
    },
    {
      color: "J",
      startX: 35,
      endY: 5,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateL, TETROMINOS.L.inverse]
    }
  ],
  [
    {
      color: "I",
      startX: 32,
      endY: 8,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "T",
      startX: 30,
      endY: 8,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL]
    },
    {
      color: "L",
      startX: 2,
      endY: 7,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateL]
    },
    {
      color: "I",
      startX: 7,
      endY: 10,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "S",
      startX: 11,
      endY: 8,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateR]
    },
    {
      color: "Z",
      startX: 15,
      endY: 6,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.default]
    }
  ],
  [
    {
      color: "S",
      startX: 29,
      endY: 10,
      list: [TETROMINOS.S.default, TETROMINOS.S.default]
    }
  ],
  [
    {
      color: "Z",
      startX: 28,
      endY: 10,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.rotateR]
    },
    {
      color: "T",
      startX: 3,
      endY: 9,
      list: [TETROMINOS.T.default, TETROMINOS.T.default]
    },
    {
      color: "T",
      startX: 17,
      endY: 6,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL]
    }
  ],
  [
    {
      color: "L",
      startX: 27,
      endY: 10,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateL, TETROMINOS.J.inverse]
    },
    {
      color: "S",
      startX: 4,
      endY: 10,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateL, TETROMINOS.S.inverse]
    },
    {
      color: "S",
      startX: 18,
      endY: 9,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateL]
    }
  ]
]
