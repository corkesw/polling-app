exports.wipePoll = ()=> {
    localStorage.removeItem("question");
    localStorage.removeItem("answers");
    localStorage.removeItem("correctAnswers");
}