import React from "react";
import styled from "styled-components";
import Players from "../GameInfo/components/Players/Players";
import { HEATMAP_FULL, HEATMAP_ZONE_QUARTER } from "./types";

// return ф-ция - обработчик
// input - string className

class ButtonProperties {
  static dupletItem = null;
  static emptyQuarter(matrix) {
    var flag = true;
    var i;
    var j;
    for (i = 0; i < 6; i++) {
      for (j = 0; j < 6; j++) {
        if (matrix[i][j] != 0) {
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      return 2;
    }
    flag = true;
    for (i = 0; i < 6; i++) {
      for (j = 7; j < 13; j++) {
        if (matrix[i][j] != 0) {
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      return 1;
    }
    flag = true;
    for (i = 7; i < 13; i++) {
      for (j = 0; j < 6; j++) {
        if (matrix[i][j] != 0) {
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      return 3;
    }
    flag = true;
    for (i = 7; i < 13; i++) {
      for (j = 7; j < 13; j++) {
        if (matrix[i][j] != 0) {
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      return 4;
    }
    return -1;
  }

  static 
  static EmptyQuarter;
  static Get(moveCount, matrix, handleHelp) {
    // нужно: ход, матрица игры
    //ход
    var clastersObj = {
      "leela-zero": {
        // type = className = {"leela-zero"}
        type: "leela-zero",
        hints: [
          {
            handler: handleHelp({ type: "map", id: HEATMAP_FULL }),
            text: "Тепловая карта доски",
            type: "leela-zero",
          },
          {
            handler: handleHelp({ type: "single", id: 1, count: 1 }),
            text: "Ваш лучший ход",
            type: "leela-zero",
          },
          {
            handler: handleHelp({
              type: "multiple",
              multipleHandleCount: 4,
              id: 16,
            }),
            text: "Лучший ход из трех",
            type: "leela-zero",
          },
          {
            handler: handleHelp({ type: "map", id: HEATMAP_ZONE_QUARTER }),
            text: "В какой четверти доски сейчас лучший ход?",
            type: "leela-zero",
          },
          {
            handler: handleHelp({ type: "score", id: 34 }),
            text: "Определить победителя на данный момент",
            type: "leela-zero",
          },
        ],
      },
      // "attack-def": {
      //   type: "attack-def",
      //   hints: [
      //     { handler: null, text: null, type: "attack-def" },
      //     { handler: null, text: null, type: "attack-def" },
      //     { handler: null, text: null, type: "attack-def" },
      //     { handler: null, text: null, type: "attack-def" },
      //   ],
      // },
      duplet: {
        type: "duplet",
        hints: [
          {
            type: "duplet",
            item1: {
              handler: handleHelp({ type: "map", id: HEATMAP_FULL }),
              text: "Тепловая карта доски",
              type: "duplet",
            },
            item2: {
              handler: handleHelp({ type: "map", id: HEATMAP_ZONE_QUARTER }),
              text: "В какой четверти доски сейчас лучший ход?",
              type: "duplet",
            },
          },
          {
            type: "duplet",
            item1: {
              handler: handleHelp({ type: "single", id: 1, count: 1 }),
              text: "Ваш лучший ход",
              type: "duplet",
            },
            item2: {
              handler: handleHelp({
                type: "multiple",
                multipleHandleCount: 4,
                id: 16,
              }),
              text: "Лучший ход из трех",
              type: "duplet",
            },
          },
          {
            type: "duplet",
            item1: {
              handler: handleHelp({ type: "map", id: HEATMAP_ZONE_QUARTER }),
              text: "В какой четверти доски сейчас лучший ход?",
              type: "duplet",
            },
            item2: {
              handler: handleHelp({
                type: "multiple",
                multipleHandleCount: 4,
                id: 16,
              }),
              text: "Лучший ход из трех",
              type: "duplet",
            },
          },
        ],
      },
      debute: {
        type: "debute",
        hints: [
          {
            handler: null,
            text:
              "Хоси (4, 4). Агрессивный дебютный ход, направленный в центр.",
            quarter: ButtonProperties.EmptyQuarter,
            type: "debute",
          },
          {
            handler: null,
            text: "Комоку (3, 4). Дебютный ход, направленный на сторону.",
            quarter: ButtonProperties.EmptyQuarter,
            type: "debute",
          },
          {
            handler: null,
            text:
              "Сан - сан (3, 3).Надежный дебютный ход, направленный в угол.",
            quarter: ButtonProperties.EmptyQuarter,
            type: "debute",
          },
          {
            handler: null,
            text:
              "Мокухадзуси (3, 5).Дебютный ход, направленный на сторону или в центр.",
            quarter: ButtonProperties.EmptyQuarter,
            type: "debute",
          },
          {
            handler: null,
            text: "Такамоку (4, 5).",
            quarter: ButtonProperties.EmptyQuarter,
            type: "debute",
          },
        ],
      },
      default: {
        type: "default",
        hints:
          moveCount == 1
            ? { handler: null, text: "Игра началась. Удачи!", type: "default" }
            : moveCount == 41
            ? {
                handler: null,
                text:
                  "Вы в стадии Фусэки (early game). До стадии Тюбан (midgame) ",
                type: "default",
              }
            : moveCount == 81
            ? {
                handler: null,
                text: "Вы перешли в стадию Тюбан (midgame).",
                type: "default",
              }
            : moveCount == 121
            ? {
                handler: null,
                text:
                  "Вы в стадии Тюбан (midgame). До стадии Ёсэ (late game) {81 - n} ход(а/ов).",
                type: "default",
              }
            : moveCount > 1 && moveCount < 41
            ? {
                handler: null,
                text: "Вы перешли в стадию Ёсэ (late game).",
                type: "default",
              }
            : moveCount > 41 && moveCount < 81
            ? {
                handler: null,
                text:
                  "Вы в стадии Ёсэ. До среднего количества ходов в игре {121 - n} ход(а/ов).",
                type: "default",
              }
            : moveCount > 81 && moveCount < 121
            ? {
                handler: null,
                text:
                  "Вы в стадии Ёсэ и достигли среднего количества ходов в игре!",
                type: "default",
              }
            : moveCount > 121
            ? {
                handler: null,
                text:
                  "Вы в стадии Ёсэ. Больше среднего количества ходов в игре на {n - 121} ход(а/ов).",
                type: "default",
              }
            : null,
      },
    };

    // clasters - массив кластеров подсказок
    // hints - сами подсказки
    let clasters = ["leela-zero", "duplet", "debute", "default"];

    let nessesary = [];

    // добавил дефолт
    if (
      moveCount == 1 ||
      moveCount == 41 ||
      moveCount == 81 ||
      moveCount == 121
    ) {
      nessesary.push("default");
    }
    // убрал атаку/защиту
    // if (moveCount > 41) {
    //   clasters = clasters.filter((x) => x != "attack-def");
    // }
    // добавил дебют
    ButtonProperties.EmptyQuarter = ButtonProperties.emptyQuarter(matrix);
    if (ButtonProperties.EmptyQuarter != -1) {
      //console.log(clasters.find((x) => x.type == "debute"));
      nessesary.push("debute");
    }
    // добавил элемент тандема
    if (ButtonProperties.dupletItem != null) {
      nessesary.push("duplet");
    }

    // закидываем в nessesary рандомный класс
    clasters = clasters.filter((x) => !nessesary.includes(x));
    console.log(clasters);
    console.log(nessesary);
    var in_use = [];
    for (let i = 0; nessesary.length < 3; i++) {
      console.log(i);
      var j = Math.floor(Math.random() * clasters.length);
      console.log(j);
      while (in_use.includes(j)) {
        j = Math.floor(Math.random() * clasters.length);
        console.log(j);
      }
      nessesary.push(clasters[j ]);
      in_use.push(j);
      //console.log(in_use);
    }
    console.log(nessesary);
    // закиды ваем в рез рандомный хинт
    var rez = [];
    for (let i = 0; i < nessesary.length; i++) {
      if (nessesary[i] == "default") {
        rez.push(clastersObj["default"].hints);
        continue;
      }
      if (nessesary[i] == "duplet" && ButtonProperties.dupletItem == null) {
        let randIndex = Math.floor(
          Math.random() * clastersObj["duplet"].hints.length
        );
        rez.push(clastersObj["duplet"].hints[randIndex].item1);
        ButtonProperties.dupletItem =
          clastersObj["duplet"].hints[randIndex].item2;
      } else if (
        nessesary[i] == "duplet" &&
        ButtonProperties.dupletItem != null
      ) {
        rez.push(ButtonProperties.dupletItem);
        ButtonProperties.dupletItem = null;
      } else if (
        nessesary[i] == "debut" &&
        ButtonProperties.dupletItem == null
      ) {
        let debut =
          clastersObj["debut"].hints[
            Math.floor(Math.random() * clastersObj["debut"].hints.length)
          ];
        debut.item1.quarter = ButtonProperties.EmptyQuarter;
        debut.item2.quarter = ButtonProperties.EmptyQuarter;
        rez.push(debut.item1);
        ButtonProperties.dupletItem = debut.item2;
      } else {
        rez.push(
          clastersObj[nessesary[i]].hints[
            Math.floor(Math.random() * clastersObj[nessesary[i]].hints.length)
          ]
        );
      }
    }
    return rez;
  }
}

const Wrapper = styled.div`
  width: 46%;
  margin-left: 25px;
`;

const HelpWrapper = styled.div`
  margin-top: 23px;
  max-height: 508px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  background-color: "#f6f6f6";
`;

const HelpItem = styled.div`
  width: 48%;
  margin-bottom: 10px;
  background: ${(props) => (props.active ? "#D8AD63" : "#f6f6f6")};
  padding: 10px;
  cursor: pointer;
`;

// purple
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);
// green
const ColorButton2 = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);
// blue
const ColorButton3 = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
  },
}))(Button);
// red
const ColorButton4 = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
}))(Button);

function buttonProcede(type, handler, text) {
  if (type == "leela-zero")
    return (
      <ColorButton
        variant="contained"
        color="primary"
        size="lg"
        active={activeHelpId === 16}
        onClick={() => scores && handler}
      >
        <img
          src={hint_vis}
          width="50"
          height="50"
          className="d-inline-block align-top"
        ></img>
        {text}
      </ColorButton>
    );
    else if(type == "duplet")
    {
      return (
        <ColorButton2
          variant="contained"
          color="primary"
          size="lg"
          active={activeHelpId === 16}
          onClick={() => scores && handler}
        >
          <img
            src={hint_vis}
            width="50"
            height="50"
            className="d-inline-block align-top"
          ></img>
          {text}
        </ColorButton2>
      );
    }
    else if(type == "debute")
    {
      return (
        <ColorButton3
          variant="contained"
          color="primary"
          size="lg"
          active={activeHelpId === 16}
          onClick={() => scores && handler}
        >
          <img
            src={hint_vis}
            width="50"
            height="50"
            className="d-inline-block align-top"
          ></img>
          text
        </ColorButton3>
      );
    }
    else if(type == "debute")
    {
      return (
        <ColorButton4
          variant="contained"
          color="primary"
          size="lg"
          active={activeHelpId === 16}
          onClick={() => scores && handler}
        >
          <img
            src={hint_vis}
            width="50"
            height="50"
            className="d-inline-block align-top"
          ></img>
          text
        </ColorButton4>
      );
    }
}

const Help = ({
  enemyPass,
  stepColor,
  yourColor,
  you,
  opponent,
  stepMain,
  stepTwo,
  handleHelp,
  activeHelpId,
  scores,
  times,
}) => {
  return (
    <Wrapper>
      <Players
        enemyPass={enemyPass}
        opponent={opponent}
        you={you}
        stepColor={stepColor}
        yourColor={yourColor}
        stepMain={stepMain}
        stepTwo={stepTwo}
        times={times}
      />
      <HelpWrapper>
        <HelpItem
          active={activeHelpId === 32}
          onClick={() => scores && handleHelp({ type: "super", id: 32 })}
        >
          перевес по очкам
        </HelpItem>
        <HelpItem
          active={activeHelpId === 1}
          onClick={() =>
            scores && handleHelp({ type: "single", id: 1, count: 1 })
          }
        >
          Лучший ход
        </HelpItem>
        <HelpItem
          active={activeHelpId === HEATMAP_FULL}
          onClick={() =>
            scores && handleHelp({ type: "map", id: HEATMAP_FULL })
          }
        >
          Тепловая карта всей доски. Детализированная
        </HelpItem>
        <HelpItem
          active={activeHelpId === 16}
          onClick={() =>
            scores &&
            handleHelp({ type: "multiple", multipleHandleCount: 4, id: 16 })
          }
        >
          Показать лучший из заданных 3 ходов
        </HelpItem>
        <HelpItem
          active={activeHelpId === HEATMAP_ZONE_QUARTER}
          onClick={() =>
            scores && handleHelp({ type: "map", id: HEATMAP_ZONE_QUARTER })
          }
        >
          В какой четверти доски сейчас лучший ход?
        </HelpItem>
        <HelpItem
          active={activeHelpId === 34}
          onClick={() => scores && handleHelp({ type: "score", id: 34 })}
        >
          Кто побеждает на данный момент?
        </HelpItem>
      </HelpWrapper>
    </Wrapper>
  );
};

export default Help;
