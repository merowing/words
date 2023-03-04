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
      <div
          className='theme'
          onClick={change_theme}
          style={
              (show_theme)
                  ? {}
                  : {display: 'none'}
          }
      >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={(!theme) ? 'active sun' : 'sun'}>
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={(theme) ? 'active' : ''}>
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
          </svg>
      </div>
      <Main 
        show_theme_active={show_theme_active}
      />
    </div>
  );
}

export default App;
