module.exports = {
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
    ],
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: [
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
}
