new Button(v(19, 3), {
  onPlayer: (e) => {
    e.player.setScale(Math.min(Math.max(e.player.scale + 0.0075, 0.5), 2));
  },
}),
  new Button(v(17, 3), {
    onPlayer: (e) => {
      e.player.setScale(Math.min(Math.max(e.player.scale - 0.0075, 0.5), 2));
    },
  });
var levels = {
  one: {
    playersBinded: false,
    map: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    jumppads: [],
    buttons: [],
    keys: [v(17, 7.5)],
    blocks: [],
    lasers: [],
    doors: [
      new Door(v(2, 9), {
        nextLevel: "two",
      }),
    ],
  },
  
  
  clancysTempLevel: {
    playersHaveShields: [],
    playersBinded: false,
    map: [
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    lasers: [
      { pos: v(9, 0), angle: 1 },
      { pos: v(12, 0), angle: 1 },
      { pos: v(15, 0), angle: 1 },
      { pos: v(18, 0), angle: 1 },
    ],
    buttons: [],
    keys: [v(6, 8)],
    blocks: [
      { pos: v(6, 2), size: v(3, 1), minPlayers: 1 },
      { pos: v(6, 3), size: v(3, 1), minPlayers: 1 },
      { pos: v(6, 4), size: v(3, 1), minPlayers: 1 },
    ],
    doors: [new Door(v(2, 9), { nextLevel: "tempLevel" })],
  },
  two: {
    playersBinded: false,
    jumppads: [],
    map: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    buttons: [],
    keys: [v(10, 2)],
    blocks: [],
    doors: [
      new Door(v(2, 9), {
        nextLevel: "three",
      }),
    ],
  },
  three: {
    playersBinded: true,
    jumppads: [],

    map: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    ],
    buttons: [],
    keys: [v(9, 10)],
    blocks: [],
    doors: [
      new Door(v(17, 9), {
        nextLevel: "four",
      }),
    ],
  },
  four: {
    playersBinded: false,
    jumppads: [],
    map: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    buttons: [
      new Button(v(6, 9), {
        onPlayer: (e) => {
            if (e.player) e.player.setScale(
            Math.min(Math.max(e.player.scale + 0.0075, 0.5), 2)
          );
        },
      }),
      new Button(v(4, 9), {
        onPlayer: (e) => {
            if (e.player) e.player.setScale(
            Math.min(Math.max(e.player.scale - 0.0075, 0.5), 2)
          );
        },
      }),
    ],
    keys: [],
    blocks: [
      {
        pos: v(11, 1.5),
        size: v(1, 2),
        static: true,
      },
      {
        pos: v(11, 8),
        size: v(1, 2),
      },
      {
        pos: v(16, 9),
        size: v(1, 2),
        minPlayers: 2,
      },
    ],
    doors: [
      new Door(v(20, 10), {
        nextLevel: "five",
        open: true,
      }),
    ],
  },
  five: {
    playersBinded: false,
    jumppads: [],
    playersHaveShields: [3],
    map: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    buttons: [],
    keys: [],
    lasers: [
      {
        pos: v(6, -10),
        angle: 1,
      },
      {
        pos: v(7, -10),
        angle: 1,
      },
      {
        pos: v(8, -10),
        angle: 1,
      },
      {
        pos: v(9, -10),
        angle: 1,
      },
      {
        pos: v(10, -10),
        angle: 1,
      },
      {
        pos: v(11, -10),
        angle: 1,
      },
      {
        pos: v(12, -10),
        angle: 1,
      },
      {
        pos: v(13, -10),
        angle: 1,
      },
      {
        pos: v(14, -10),
        angle: 1,
      },
      {
        pos: v(15, -10),
        angle: 1,
      },
    ],
    blocks: [],
    doors: [
      new Door(v(20, 10), {
        nextLevel: "six",
        open: true,
      }),
    ],
  },
  six: {
    playersHaveShields: [],
    jumppads: [],
    playersBinded: false,
    map: [
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    lasers: [],
    buttons: [],
    keys: [v(9, 1)],
    blocks: [
      {
        pos: v(12, 0),
        size: v(1, 3),
        minPlayers: 0,
      },
      {
        pos: v(1, 5),
        size: v(1, 1),
        minPlayers: 0,
      },
    ],
    doors: [
      new Door(v(19, 5), {
        nextLevel: "seven",
      }),
    ],
  },
  seven: {
    jumppads: [],
    playersHaveShields: [3, 1],
    playersBinded: false,
    map: [
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
    ],
    lasers: [
      {
        pos: v(4, 0),
        angle: 1,
      },
      {
        pos: v(9, 9),
        angle: 3,
      },
      {
        pos: v(11, 9),
        angle: 3,
      },
      {
        pos: v(13, 9),
        angle: 3,
      },
      {
        pos: v(15, 9),
        angle: 3,
      },
    ],
    buttons: [],
    keys: [v(18, 3)],
    blocks: [],
    doors: [
      new Door(v(18, 9), {
        nextLevel: "eight",
      }),
    ],
  },
  eight: {
    jumppads: [v(4, 10)],
    playersHaveShields: [],
    playersBinded: false,
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    lasers: [
      {
        pos: v(11, 8),
        angle: 3,
      },
    ],
    buttons: [],
    keys: [v(0, 0)],
    blocks: [
      {
        pos: v(5, 0),
        size: v(2, 1),
        minPlayers: 0,
      },
    ],
    doors: [
      new Door(v(19, 8), {
        nextLevel: "nine",
      }),
    ],
  },
  nine: {
    jumppads: [v(4,10)],
    playersHaveShields: [],
    playersBinded: false,
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    lasers: [],
    buttons: [],
    keys: [v(13, 0)],
    blocks: [
      {
        pos: v(6.6, 0),
        size: v(3, 2),
        minPlayers: 0,
      },
      {
        pos: v(6.6, 2),
        size: v(3, 2),
        minPlayers: 0,
      },
    ],
    doors: [
      new Door(v(19, 4), {
        nextLevel: "ten",
      }),
    ],
  },
  ten: {
    jumppads: [],
    playersHaveShields: [],
    playersBinded: true,
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    lasers: [
      {
        pos: v(1, 5),
        angle: 1,
      },
      {
        pos: v(4, 8),
        angle: 2,
      },
    ],
    buttons: [],
    keys: [v(2, 7)],
    blocks: [
      {
        pos: v(10, 0),
        size: v(1, 9),
        minPlayers: 2,
      },
      {
        pos: v(1, 3),
        size: v(3, 1),
        minPlayers: 0,
      },
    ],
    doors: [
      new Door(v(19, 9), {
        nextLevel: "eleven",
      }),
    ],
  },
  eleven: {
    jumppads: [],
    playersHaveShields: [1, 4],
    playersBinded: false,
    map: [
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    ],
    lasers: [
      {
        pos: v(4, 2),
        angle: 4,
      },
      {
        pos: v(15, 50),
        angle: 3,
      },
    ],
    buttons: [
      new Button(v(5, 8), {
        onPlayer: (e) => {
            if (e.player) e.player.setScale(
            Math.min(Math.max(e.player.scale + 0.0075, 0.5), 2)
          );
        },
      }),
       new Button(v(1, 8), {
        onPlayer: (e) => {
            if (e.player)e.player.setScale(
            Math.min(Math.max(e.player.scale - 0.0075, 0.5), 2)
          );
        },
      }),
    ],
    keys: [v(19, 7)],
    blocks: [
      {
        pos: v(11, 6),
        size: v(1, 3),
        minPlayers: 0,
      },
    ],
    doors: [
      new Door(v(19, 9), {
        nextLevel: "tweleve",
      }),
    ],
  },
  tweleve: {
    jumppads: [],
    playersHaveShields: [2],
    playersBinded: false,
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    lasers: [
      {
        pos: v(50, 5),
        angle: 2,
      },
      {
        pos: v(50, 7),
        angle: 2,
      },
      
    ],
    buttons: [],
    keys: [v(8, 17)],
    blocks: [
      {
        pos: v(5, 16),
        size: v(1, 3),
        minPlayers: 2,
      },
    ],
    doors: [
      new Door(v(8, 19), {
        nextLevel: "thirteen",
      }),
    ],
  },
  thirteen:{
      jumppads:[],playersHaveShields:[],playersBinded:false,map:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],lasers:[],buttons:[
    new Button(v(9,7),{
        onPlayer:(e)=>{
            for (let i = 0; i < e.player.game.players.length; i++) {
                const p = e.player.game.players[i];
                p.kill()
            }
            
        }
    }),],keys:[
        v(19,7),],blocks:[],doors:[
    new Door(v(19,9),{
        nextLevel:"fourteen",
        
    }),]
  },
  fourteen:{
      jumppads:[],playersHaveShields:[2,],playersBinded:false,map:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],[0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],[0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],lasers:[{
        pos:v(7,5),
        angle:4,
    },{
        pos:v(16,8),
        angle:2,
    },],buttons:[
    new Button(v(12,8),{
        onPlayer:(e)=>{
            if (e.player) e.player.setScale(Math.min(Math.max(e.player.scale+0.0075, 0.5), 3))
            
        }
    }),
    new Button(v(8,8),{
        onPlayer:(e)=>{
            if (e.player) e.player.setScale(Math.min(Math.max(e.player.scale-0.0075, 0.5), 2))
            
        }
    }),],keys:[
        v(19,7),],blocks:[
    {
        pos:v(6,4),
        size:v(4,1),
        minPlayers:0
    },
    {
        pos:v(13,7.2),
        size:v(1,1),
        static:true,
        minPlayers:0
    },],doors:[
    new Door(v(19,9),{
        nextLevel:"fifteen",
        
    }),]
  },
  fifteen:{
      jumppads:[],playersHaveShields:[],playersBinded:false,map:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],lasers:[{
        pos:v(5,4),
        angle:4,
    },],buttons:[
    new Button(v(9,7),{
        onPlayer:(e)=>{
            e.player.setScale(Math.min(Math.max(e.player.scale+0.00375, 0.5), 2))
            
        }
    }),
    new Button(v(10,7),{
        onPlayer:(e)=>{
            e.player.setScale(Math.min(Math.max(e.player.scale+0.00375, 0.5), 2))
            
        }
    }),
    new Button(v(11,7),{
        onPlayer:(e)=>{
            e.player.setScale(Math.min(Math.max(e.player.scale+0.00375, 0.5), 2))
            
        }
    }),
    new Button(v(12,7),{
        onPlayer:(e)=>{
            e.player.setScale(Math.min(Math.max(e.player.scale+0.00375, 0.5), 2))
            
        }
    }),
    new Button(v(13,7),{
        onPlayer:(e)=>{
            e.player.setScale(Math.min(Math.max(e.player.scale+0.00375, 0.5), 2))
            
        }
    }),
    new Button(v(14,7),{
        onPlayer:(e)=>{
            e.player.setScale(Math.min(Math.max(e.player.scale+0.00375, 0.5), 2))
            
        }
    }),
    new Button(v(15,4),{
        onPlayer:(e)=>{
            e.player.setScale(Math.min(Math.max(e.player.scale-0.0075, 0.5), 2))
            
        }
    }),

    new Button(v(3,8),{
        onPress:(e)=>{
            mainGame.lasers[0].enabled = false
            
        },
        onUnpress:(e)=>{
            mainGame.lasers[0].enabled = true
            
        }
    }),],keys:[
        v(19,7),],blocks:[],doors:[
    new Door(v(18,9),{
        nextLevel:"one",
        
    }),]
  },
  sixteen:{
      jumppads:[
    v(14,10),],playersHaveShields:[],playersBinded:false,map:[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],lasers:[{
    pos:v(4,10),
    angle:1,
},{
    pos:v(12,10),
    angle:1,
},{
    pos:v(1,12),
    angle:4,
},{
    pos:v(18,12),
    angle:2,
},],buttons:[
new Button(v(4,8),{
    onPress:(e)=>{
        mainGame.lasers[0].enabled = false
        
    },
    onUnpress:(e)=>{
        mainGame.lasers[0].enabled = true
    }
}),
new Button(v(6,8),{
    onPress:(e)=>{
        mainGame.lasers[1].enabled = false
        
    },
    onUnpress:(e)=>{
        mainGame.lasers[1].enabled = true
    }
}),
new Button(v(8,8),{
    onPress:(e)=>{
        mainGame.lasers[3].enabled = false
        
    },
    onUnpress:(e)=>{
        mainGame.lasers[3].enabled = true
    }
}),
new Button(v(10,8),{
    onPress:(e)=>{
        mainGame.lasers[2].enabled = false
        
    },
    onUnpress:(e)=>{
        mainGame.lasers[2].enabled = true
    }
}),],keys:[
    v(2,11),],blocks:[
{
    pos:v(12,2),
    size:v(1,1),
    minPlayers:0
},{
    pos:v(12,1),
    size:v(1,1),
    minPlayers:0
},],doors:[
new Door(v(18,7),{
    nextLevel:"seventeen",
    
}),]
  },
  seventeen:{
    jumppads:[
    v(14,6),],playersHaveShields:[],playersBinded:true,map:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1],[0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1],[0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],lasers:[],buttons:[],keys:[
    v(19,2),],blocks:[],doors:[
new Door(v(12,11),{
    nextLevel:"eighteen",
    
}),]
  },
  eighteen:{jumppads:[
    v(11,13),
    v(12,13),],playersHaveShields:[],playersBinded:false,map:[[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[1,1,1,1,1,0,0,0,0,0,0,1,0,0,0],[1,1,1,1,1,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,1,0,0,0,0,0,0,1,1,1,1],[0,0,0,0,1,0,0,0,0,0,0,1,1,1,1],[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1]],lasers:[{
    pos:v(13,10),
    angle:2,
},],buttons:[],keys:[
    v(8,12),],blocks:[],doors:[
new Door(v(8,14),{
    nextLevel:"one",
    
}),]},
  nineteen:{jumppads:[],playersHaveShields:[],playersBinded:false,map:[
  [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
],lasers:[{
  pos:v(12,1),
  angle:1,
  enabled:false,
},{
  pos:v(19,1),
  angle:1,
},{
  pos:v(12,9),
  angle:1,
},{
  pos:v(14,9),
  angle:1,
},{
  pos:v(1,10),
  angle:4,
},{
  pos:v(1,12),
  angle:4,
},{
  pos:v(1,14),
  angle:4,
},{
  pos:v(1,16),
  angle:4,
},],buttons:[
new Button(v(16,7),{
  onPress:(e)=>{
    mainGame.lasers[0].enabled = true
    mainGame.lasers[1].enabled = false
    
}
}),],keys:[
  v(23,15),],blocks:[
{
  pos:v(8,5),
  size:v(1,2),
  minPlayers:0
},
{
  pos:v(7,6),
  size:v(1,1),
  minPlayers:0
},
{
  pos:v(9,6),
  size:v(1,1),
  minPlayers:0
},
{
  pos:v(6,7),
  size:v(2,1),
  minPlayers:0
},
{
  pos:v(8,7),
  size:v(2,1),
  minPlayers:0
},],doors:[
new Door(v(23,17),{
  nextLevel:"tempLevel",
  
}),]},
"tempName":{jumppads:[
    v(13,10),],playersHaveShields:[],playersBinded:false,map:[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],lasers:[{
    pos:v(4,10),
    angle:1,
},{
    pos:v(8,10),
    angle:1,
},{
    pos:v(12,10),
    angle:1,
},{
    pos:v(1,12),
    angle:4,
},{
    pos:v(18,12),
    angle:2,
},],buttons:[
new Button(v(4,8),{
    onPlayer:(e)=>{
        e.player.setScale(Math.min(Math.max(e.player.scale+0.0075, 0.5), 2))
        
    }
}),
new Button(v(6,8),{
    onPlayer:(e)=>{
        e.player.setScale(Math.min(Math.max(e.player.scale+0.0075, 0.5), 2))
        
    }
}),
new Button(v(8,8),{
    onPlayer:(e)=>{
        e.player.setScale(Math.min(Math.max(e.player.scale+0.0075, 0.5), 2))
        
    }
}),
new Button(v(10,8),{
    onPlayer:(e)=>{
        e.player.setScale(Math.min(Math.max(e.player.scale+0.0075, 0.5), 2))
        
    }
}),],keys:[
    v(2,11),],blocks:[
{
    pos:v(12,2),
    size:v(1,1),
    minPlayers:0
},],doors:[
new Door(v(18,7),{
    nextLevel:"tempLevel",
    
}),]},
  tempName: {
    playersBinded: 0,
    jumppads: [],
    map: [
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    lasers: [
      {
        pos: v(7, 2),

        angle: 1,
      },
    ],
    buttons: [],
    keys: [v(0, 6)],
    blocks: [
      {
        pos: v(11, 6),
        size: v(1, 5),
        minPlayers: 2,
      },
    ],
    playersHaveShields: [3],
    doors: [
      new Door(v(18, 9), {
        nextLevel: "tempLevel",
      }),
    ],
  },
};
