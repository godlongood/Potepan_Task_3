// main.js

let currentInput = ""; // 現在の入力値
let operator = ""; // 現在の演算子
let expression = ""; // 数式を保持
let canInputNumber = true; // 数字を入力できるかどうかを制御

// クリックされたボタンの値に基づいて計算機の動作を定義
function get_calc(element) {
    const value = element.value; // elementはHTMLの要素を指し、thisのデータを取得
    const totalDisplay = document.getElementById("Total"); // TotalのHTMLを変更

    // クリアボタン（AC）で全ての入力をリセット
    if (value === "AC") {
        currentInput = "";
        operator = "";
        expression = ""; 
        totalDisplay.textContent = "0"; // 文字0を表示
        canInputNumber = true; // 数字入力可能にリセット
        return;
    }

    // 「00」が最初に押された場合は無視
    if (value === "00" && currentInput === "" && expression === "") {
        return;
    }

    // 最初に小数点が押された場合は無視
    if (value === "." && currentInput === "") {
        return;
    }

    // 小数点の後に数字以外が入力された場合は無視
    if (currentInput.endsWith(".") && (["+", "-", "*", "/", "."].includes(value))) {
        return;
    }

    // 最初に「0」が押され、その後に他の数字が入力された場合
    if (currentInput === "0" && !isNaN(value) && value !== "0") {
        currentInput = value; // "0"をリセットして新しい数値に置き換え
        totalDisplay.textContent = expression + currentInput;
        return;
    }

    // 演算子が押された場合
    if (["+", "-", "*", "/"].includes(value)) { // 演算子の場合
        // 演算子が最初に押された場合は無視できるように
        if (currentInput === "" && expression === "") {
            return;
        }
        // 演算子がすでに存在する場合、上書き
        if (expression !== "" && currentInput === "") {
            expression = expression.slice(0, -1) + value; // 直前の演算子を削除し新しい演算子を追加
        } else {
            expression += currentInput + value; // 現在の入力を式に追加し、演算子も追加
        }
        totalDisplay.textContent = expression; // 現在の式を表示
        currentInput = ""; // 現在の入力をリセット
        canInputNumber = true; // 数字入力可能にリセット
        return;
    }

    // 数字や小数点が押された場合
    if (!isNaN(value) || value === ".") {   // 数字または小数点の場合
        // 数字が入力できない場合は無視
        if (!canInputNumber) {
            return; 
        }

        // 小数点が複数入らないようにチェック
        if (value === "." && currentInput.includes(".")) {
            return;
        }

        currentInput += value; // 現在の入力に追加
        totalDisplay.textContent = expression + currentInput; // 表示を更新
        return;
    }

    // イコールボタン（=）で計算結果を出力
    if (value === "=") {
        if (currentInput !== "") {
            expression += currentInput; // 現在の入力を式に追加
                const result = eval(expression.trim()); // 現在の式を評価
                const roundedResult = Math.round(result * 100) / 100; // 小数点以下2桁に四捨五入
                totalDisplay.textContent = roundedResult; // 計算結果を表示
                currentInput = roundedResult.toString(); // 計算結果を currentInput に設定
                expression = ""; // 数式をリセット
                canInputNumber = false; // 数字入力を無効にする
        }
    return
    }  
}

