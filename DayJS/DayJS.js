let todaysDate1 = document.getElementById('date-1');
let todaysDate2 = document.getElementById('date-2');
let todaysDate3 = document.getElementById('date-3');
let dates = {
  firstLogIn: function() {
    let now =  localStorage.setItem('firstLogIn', dayjs().subtract(1500, 'month').format('YYYY-MM-DD'));
    return now;
  },
  dateTwentyDays: function() {
    return dayjs().add(50, 'day').format('YYYY-MM-DD');
  },
  firstLogInLogic: function() {
    let today = dayjs();
    let firstLogIn = localStorage.getItem('firstLogIn');
    let totalDaysLoggedIn = 0;
    if (firstLogIn === null) {
      localStorage.setItem('firstLogIn', dayjs().format('YYYY-MM-DD'));
      return dayjs().format('YYYY-MM-DD');
    } else {
      totalDaysLoggedIn = today.diff(firstLogIn, 'days');
      return totalDaysLoggedIn;
    }
  }
};

todaysDate1.innerHTML = dates.firstLogIn();

todaysDate2.innerHTML = dates.dateTwentyDays();

todaysDate3.innerHTML = dates.firstLogInLogic();
