import Main from './pages/Main';

daily();

function set_daily_default() {
  const daily = {
      time: Date.now(),
      active: true,
      words: unique(),
  };
  localStorage.setItem("daily", JSON.stringify(daily));
}

function daily() {
  const json_string = localStorage.getItem("daily");

  if(json_string) {
      const data = JSON.parse(json_string);
      
      const date_string = new Date(data.time).toDateString();
      const twenty_four_hours = 86400000;
      const time_passed = Date.now() - (new Date(date_string));

      if(twenty_four_hours - time_passed <= 0) {
        const new_data = {
          time: Date.now(),
          active: true,
          words: unique(),
        }
        
        localStorage.setItem("daily", JSON.stringify(new_data));
      }
  }else {
    set_daily_default();
  }
}

function unique(max = 10) {
  let json_string = localStorage.getItem("words")
  const indexes = [];
  let arr = [];
  
  if(json_string) {
      arr = JSON.parse(json_string)
        .map(word => word.id);
  }

  if(max > arr.length) max = arr.length;

  for(let i = 0; i < max; i++) {
      const ind = Math.round(Math.random() * (arr.length - 1));
      indexes.push(...arr.splice(ind, 1));
  }

  return indexes;
}

function App() {
  return (
    <Main />
  );
}

export default App;
