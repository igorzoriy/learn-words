module.exports = {
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: [
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
}
