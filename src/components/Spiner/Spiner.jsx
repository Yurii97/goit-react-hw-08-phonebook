import { TailSpin } from 'react-loader-spinner';

function Spiner({size}) {
  return (
    <div>
      <TailSpin color="#00BFFF" margin="0 auto"  width={size}/>
    </div>
  );
}

export default Spiner;