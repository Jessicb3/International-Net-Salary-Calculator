const taxBrackets = {
    brazil: [
        { limit: 22847.76, rate: 0 },
        { limit: 33919.80, rate: 0.075 },
        { limit: 45012.60, rate: 0.15 },
        { limit: 55976.16, rate: 0.225 },
        { limit: Infinity, rate: 0.275 }
    ],
    usa: [
        { limit: 9875, rate: 0.10 },
        { limit: 40125, rate: 0.12 },
        { limit: 85525, rate: 0.22 },
        { limit: 163300, rate: 0.24 },
        { limit: 207350, rate: 0.32 },
        { limit: 518400, rate: 0.35 },
        { limit: Infinity, rate: 0.37 }
    ],
    uk: [
        { limit: 12500, rate: 0 },
        { limit: 50000, rate: 0.20 },
        { limit: 150000, rate: 0.40 },
        { limit: Infinity, rate: 0.45 }
    ],
    canada: [
        { limit: 48535, rate: 0.15 },
        { limit: 97069, rate: 0.205 },
        { limit: 150473, rate: 0.26 },
        { limit: 214368, rate: 0.29 },
        { limit: Infinity, rate: 0.33 }
    ],
    germany: [
        { limit: 9744, rate: 0 },
        { limit: 57918, rate: 0.14 },
        { limit: 274612, rate: 0.42 },
        { limit: Infinity, rate: 0.45 }
    ],
    france: [
        { limit: 10064, rate: 0 },
        { limit: 25659, rate: 0.11 },
        { limit: 73369, rate: 0.30 },
        { limit: 157806, rate: 0.41 },
        { limit: Infinity, rate: 0.45 }
    ],
    italy: [
        { limit: 15000, rate: 0.23 },
        { limit: 28000, rate: 0.27 },
        { limit: 55000, rate: 0.38 },
        { limit: 75000, rate: 0.41 },
        { limit: Infinity, rate: 0.43 }
    ],
    spain: [
        { limit: 12450, rate: 0.19 },
        { limit: 20200, rate: 0.24 },
        { limit: 35200, rate: 0.30 },
        { limit: 60000, rate: 0.37 },
        { limit: Infinity, rate: 0.45 }
    ]
};

const predefinedSalaries = {
    brazil: 16944,
    usa: 60000,
    uk: 50000,
    canada: 55000,
    germany: 45000,
    france: 40000,
    italy: 35000,
    spain: 30000
};

function updateSalary() {
    const country = document.getElementById('country').value;
    const predefinedSalary = predefinedSalaries[country];
    document.getElementById('income').value = predefinedSalary;
}

function calculateNetSalary() {
    const income = parseFloat(document.getElementById('income').value);
    const country = document.getElementById('country').value;
    const brackets = taxBrackets[country];

    let tax = 0;
    let remainingIncome = income;

    for (let i = 0; i < brackets.length; i++) {
        const { limit, rate } = brackets[i];
        if (remainingIncome > 0) {
            const bracketValue = Math.min(remainingIncome, limit - (brackets[i - 1] ? brackets[i - 1].limit : 0));
            const bracketTax = bracketValue * rate;
            tax += bracketTax;
            remainingIncome -= bracketValue;
        }
    }

    const netSalary = income - tax;
    document.getElementById('result').textContent = `Net Salary: $${netSalary.toFixed(2)}`;
}
