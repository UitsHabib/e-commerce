## Readme Top

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">E-commerce</h3>

  <p align="center">
    Developer Guide To Start The Project!
  </p>
</div>

<!-- Local Environment Setup -->

# Local Environment Setup

### Install

1. git
2. vs code
3. Node
4. create-react-app
5. pnpm
6. docker

<!--Project Env Variables-->

<!-- Start Application -->

# Start Application

To start the application run the following command

```
$ pnpm start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Git Commit Message Guideline And Git Flow -->

# Git Commit Message Guideline And Git Flow

### Step 1. Prepend Trello card name with '\_' on commit message

> (e.g. Card name: Message Subject).

### Step 2. Follow standard seven rules ( first three are mandatory) of commit message:

1. **_Subject line will be capital letter format_**
2. **_Use the imperative pattern in the subject line_**
3. **_Do not end the subject line with a period_**
4. Separate subject from body with a blank line
5. Limit the subject line to 50 characters
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how

> Example: login: Add Attribution Field for Marketing Channel Analysis

### Guideline for WIP 🚧 (working in progress)

**_If you are committing a work in progress, for which, you cannot come up a better name, don’t just commit WIP.
Instead, think what you would commit if there work was complete, and add (WIP) after it. Like -_**

> login: Add Login Api

## Branch naming convention:

1. Initial part will be as it is as per branch purpose (purpose example: "feature", "hotfix", "poc", "bugfix")
2. Then put a "/"
3. Then put Your name
4. Then Put a "-"
5. Then put the branch name with only hypen convention, no blankspace or underscore. Put the card name with '-' just after "/". (example: feature/Habib-Change-Password)

```
> Example: feature/Mamun-login, feature/Riyad-service-management , hotfix/tareq-wrong-otp-count, poc/Fahad-role-base-authentication,
> bugfix/Emon-typo-in-tnc
```

#### Extra Note: Periodically clean up dead branch (created by you)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# GIT Commands

```
$ git pull --rebase origin <branch-name> (for pull)
$ git push --force-with-lease origin <branch-name> (for push)
$ git fetch (when you want to fetch everything from remote repository)
$ git rebase origin/<branch-name>
```
