import { TailSpin } from 'react-loader-spinner';

function Spiner({size}) {
  return (
    <div style={{width: size, height: size}}>
      <TailSpin color="#00BFFF" margin="0 auto" height={"inherit"} width={ "inherit"}/>
    </div>
  );
}

export default Spiner;