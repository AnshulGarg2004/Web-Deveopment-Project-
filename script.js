document.addEventListener("DOMContentLoaded", function () {
    const srchbtn = document.getElementById("btn")
    const nameinput = document.getElementById("nme")
    const statcontainer = document.querySelector(".stats")
    const easy = document.querySelector(".easy")
    const med = document.querySelector(".medium")
    const hard = document.querySelector(".hard")
    const easylab = document.getElementById("eas-lab")
    const medlab = document.getElementById("med-lab")
    const hardlab = document.getElementById("hard-lab")
    const stats = document.querySelector(".stats")
    // is valid username
    function is_valid_username(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{4,16}$/;
        const ismatch = regex.test(username);
        if (!ismatch) {
            alert("Username Invalid");
        }
        return ismatch;
    }
    async function fetch_user_details(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try {
            srchbtn.textContent = "🔎 Searching...";
            srchbtn.disabled = true;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch userdetail");
            }
            const passeddata = await response.json();
            console.log("Logging data:", passeddata);

            displsy_user_data(passeddata);
        }
        catch (error) {
            statcontainer.innerHTML = "<p>No data found </p>";
        }
        finally {
            srchbtn.textContent = "🔎Search";
            srchbtn.disabled = false;
        }
    }
    function updateprogress(solved, total, label, circle) {
        const prgdeg = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${prgdeg}%`);
        label.textContent = `${solved}/${total}`;
    }
    function displsy_user_data(passeddata) {
        const totalques = passeddata.totalQuestions;
        const easyques = passeddata.totalEasy;
        const medques = passeddata.totalMedium;
        const hardques = passeddata.totalHard;

        const solvedques = passeddata.totalSolved
        const easysolve = passeddata.easySolved
        const medsolve = passeddata.mediumSolved
        const hardsolve = passeddata.hardSolved
        updateprogress(easysolve, easyques, easylab, easy);
        updateprogress(medsolve, medques, medlab, med);
        updateprogress(hardsolve, hardques, hardlab, hard);

        const cardsdata = [
            {
                label: "Total questions",
                value: passeddata.totalSolved
            },
            {
                label: "Acceptace Rate",
                value: passeddata.acceptanceRate
            },
            {
                label: "Ranking",
                value: passeddata.ranking
            },
            {
                label: "Contribution points",
                value: passeddata.contributionPoints
            }
        ];
        console.log("Card Data:", cardsdata);
        stats.innerHTML = cardsdata.map(
            data =>
                `
                        <div class="cards">
                            <h3>${data.label}</h3>
                            <span>${data.value}</span>
                        </div>
                        `

        ).join("");


    }
    // search clicked
    srchbtn.addEventListener('click', function () {
        const name = nameinput.value;
        console.log("Username: ", name)
        if (is_valid_username(name)) {
            fetch_user_details(name);
        }
    })

})
