import moment from "moment";

export const validateEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

export const getInitials = (name)=>{
    if(!name) return "";

    const words = name.split("");
    let initials = "";

    for(let i = 0; i<Math.min(words.length, 2); i++)
    {
        initials += words[i][0];
    }

    return initials.toUpperCase();
}

export const addThousandsSeparator = (num) =>{
    if(num == null || isNaN(num)) return "";

    const [IntegerPart, fractionalPart] = num.toString().split(".");

    const formattedInteger = IntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}

export const prepareExpenseBarChartData = (data = [])=>{
    const chartData = data.map((item)=>({
        category: item?.category,
        amount:item?.amount
    }));

    return chartData;
}

export const prepareIncomeBarChartData = (data = []) =>{
    const sortedData = [...data].sort((a,b)=> new Date(a.date) - new Date(b.date))

    const chartData = sortedData.map((item)=>({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }));

    return chartData;
}

export const prepareExpenseLineChartData = (data = []) =>{
    const sortedData = [...data].sort((a,b)=> new Date(a.date) - new Date(b.date))

    const chartData = sortedData.map((item)=>({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category,
    }));

    return chartData;
}

export const prepareSAllLineChartData = (income = [], expense = []) => {
    const mapByDate = {};

    // Process income
    income.forEach(item => {
        const date = moment(item.date).format('Do MMM');
        if (!mapByDate[date]) {
            mapByDate[date] = { date, income: 0, expense: 0 };
        }
        mapByDate[date].income += item.amount;
    });

    // Process expense
    expense.forEach(item => {
        const date = moment(item.date).format('Do MMM');
        if (!mapByDate[date]) {
            mapByDate[date] = { date, income: 0, expense: 0 };
        }
        mapByDate[date].expense += item.amount;
    });

    // Convert to array and sort by original date for correct ordering
    const result = Object.values(mapByDate).sort((a, b) => {
        return moment(a.date, 'Do MMM').toDate() - moment(b.date, 'Do MMM').toDate();
    });

    return result;
};