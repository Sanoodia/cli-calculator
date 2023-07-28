import inquirer from "inquirer";
import chalk from "chalk";

const validateNumber = (input: any) => {
    const number = parseInt(input);
    if (!isNaN(number)) {
      return true;
    }
    return "ReEnter Number";
};
const calculate = (answers: {
    firstNum: string,
    secondNum: string,
    operator: string
  }) => {
    switch (answers.operator) {
    case "+ (add)":
        return parseInt(answers.firstNum) + parseInt(answers.secondNum);
    case "- (minus)":
        return parseInt(answers.firstNum) - parseInt(answers.secondNum);
    case "/ (divide)":
        return parseInt(answers.firstNum) / parseInt(answers.secondNum);
    case "x (multiply)":
        return parseInt(answers.firstNum) * parseInt(answers.secondNum);
    default:
        return "invalid operator";
    }
};
const calculator = async() =>{
    const values: {
        firstNum: string,
        secondNum: string,
        operator: string
      } = await inquirer.prompt([
        {
          name: "firstNum",
          type: "input",
          message: "Enter your First number:",
          validate: validateNumber
        },
        {
          name: "secondNum",
          type: "number",
          message: "Enter your Second Number:",
          validate: validateNumber
        },
        {
          name: "operator",
          type: "list",
          choices: ["+ (add)", "- (minus)", "/ (divide)", "x (multiply)"],
          message: "Choose operator",
        },
      ]);
    console.log(chalk.blue("Your Answer is: ", calculate(values)));
    await promptMoreCalculation()
}
const promptMoreCalculation = async() =>{
    const continuePrompt: {
        toBeContinue: boolean
      } = await inquirer.prompt([
        {
          name: "toBeContinue",
          type: "confirm",
          message: "Do you want to perform more actions",
        },
    ])
    if(continuePrompt.toBeContinue === true){
        await calculator();
    }else
        console.log(chalk.blue("Have a Nice Day!"));
}


(async()=>{
    await calculator();
})();
