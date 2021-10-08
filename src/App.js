import Board from './components/board';
import Toogle from './components/toggle';

function App() {
  return (
    <>
    <div className="settings">
      <Toogle 
        text={'Dark theme'} 
        onChange={(e) => {
          const element = document.body;

          if(e.target.checked) {
            element.classList.add('dark');
          }else{
            element.classList.remove('dark');
          }
        }}
        />
      <Toogle 
        text={'Show tips'} 
        onChange={(e) => {
          const element = document.body;

          if(e.target.checked) {
            element.classList.add('show-tips');
          }else{
            element.classList.remove('show-tips');
          }
        }}
      />
      </div><Board length={9} />
    </>
  );
}

export default App;
