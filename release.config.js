const config = {
    branches: ['main'],
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                "preset": "conventionalcommits"
            }
        ],
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                "changelogFile": "CHANGELOG.md",
                "changelogTitle": "# Changelog"
            }
        ],
        [
            "@droidsolutions-oss/semantic-release-update-file",
            {
                "files": [
                    {
                        "path": ["src/package.props"],
                        "type": "xml",
                        "replacements": [
                            { "key": "Version", "value": "${nextRelease.version}" },
                            { "key": "RepositoryCommit", "value": "${nextRelease.gitHead}" }
                        ]
                    },
                    {
                        "path": ["Directory.Build.props"],
                        "type": "xml",
                        "replacements": [
                            { "key": "ContainerImageTags", "value": "${nextRelease.version};latest" }
                        ]
                    }
                ]
            }
        ],
        ["@semantic-release/git", {
            "assets": [
                "CHANGELOG.md",
                "Directory.Build.props"
            ],
            "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }],
        [
            "@semantic-release/changelog",
            {
                "changelogFile": "CHANGELOG.md"
            }
        ],
        [
            "@semantic-release/github",
            {
                "assets": [
                    {
                        "path": "out/**"
                    }
                ]
            }
        ]
    ]
};

module.exports = config;