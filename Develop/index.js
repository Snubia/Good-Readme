
const inquire = require("inquirer");
const questions = [
  {
    type: "input",
    name: "username",
    message: "What is your username?"
  },
  {
    type: "input",
    name: "Title",
    message: "What is the tittle of your repository?"
  },
  {
    type: "input",
    name: "website",
    message: "What is the link to the deployed website?"
  },
  {
    type: "input",
    name: "descrition",
    message: "WHow would you describe your project?"
  },
  {
    type: "input",
    name: "structure",
    message: "How is your project structured?"
  },
  {
    type: "input",
    name: "technologies",
    message: "what technologies do you use?"
  

  },
  {
    type: "input",
    name: "Contributors",
    message: "Who contributed to your project?"
  

  },
  {
    type: "input",
    name: "Contact",
    message: "How to get in touch with you for contribution or feedback?"
  

  },
  {
    type: "input",
    name: "Comments",
    message: "Write any additional comments?"
  

  },
  {
    type: "list",
    message: "License type?",
    name: "license",
    choices: [
      "Apache License 2.0", 
      "GNU GPLv3", 
      "MIT",
      "Other",
      "None"
    ]
    },
  {
      type: "input",
      message: "Contributors:",
      name: "contributors"
  },
  {
    type: "input",
    message: "What are the tests?",
    name: "tests"
  },
  {
      type: "input",
      message: "Have any questions?",
      name: "questions"
  }
];

function writeToFile(fileName, data) {
  console.log("writing file")
  fs.writeFileSync(fileName, data) 
  console.log("file write complete")
}

function init() {
  console.log("initializing")
  inquire.prompt(questions)
    .then(data => {
      console.log("Success! Check your files for your README.")
      console.log(data)
      githubApi.getAvatar(data.username)
      .then(({avatar_url, email}) => {
        data.avatar_url = avatar_url
        data.email = email
        console.log(data)
        data.badge = generateBadge(data.license)
        const markdown = generateMarkdown(data)
        writeToFile("README.md", markdown)
      })
    })
    .catch(err => {
      console.error(err)
    })
}

init();
