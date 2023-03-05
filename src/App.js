import {useState} from 'react';
import Main from './pages/Main';

daily();

function local_storage_words() {
  const json_string = localStorage.getItem("words");
  if(json_string) {
    const json = JSON.parse(json_string);

    return unique()
      .reduce((arr, id) => {
        const item = json.filter(item => item.id === id);
        return [...arr, ...item];
      }, []);
  }

  return [];
}

function set_daily_default() {
  const words = local_storage_words();

  const daily = {
      time: Date.now(),
      active: true,
      words,
  };
  if(words.length === 0) daily.active = false;
  localStorage.setItem("daily", JSON.stringify(daily));
}

function daily() {
  const json_string = localStorage.getItem("daily");

  if(json_string) {
      const data = JSON.parse(json_string);
      const words = local_storage_words();

      const date_string = new Date(data.time).toDateString();
      const twenty_four_hours = 86400000;
      const time_passed = Date.now() - (new Date(date_string));

      if(twenty_four_hours - time_passed <= 0 && !data.active) {
        const new_data = {
          time: Date.now(),
          active: true,
          words,
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
  let [theme, set_theme] = useState(true);
  let [theme_night, set_theme_night] = useState(false);
  const [show_theme, set_show_theme] = useState(true);
  function change_theme() {
      set_theme(!theme);
      set_theme_night(!theme_night);
  }
  function show_theme_active(val) {
    set_show_theme(val);
  }

  return (
    <div className={(theme_night) ? 'inner night' : 'inner'}>
      <Main 
        show_theme_active={show_theme_active}
        change_theme={change_theme}
        show_theme={show_theme}
        theme={theme}
      />
    </div>
  );
}

export default App;
