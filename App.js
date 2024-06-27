import {NavigationContainer} from '@react-navigation/native';
import RotasScreen from './Pages/TotasRotas/RotasScreen';
import Rotastab from './Pages/TotasRotas/Rotastab';



export default function App() {
  return (
<NavigationContainer>
<RotasScreen />
</NavigationContainer>
  );
}

export function Home() {
  return (
<NavigationContainer>
<Rotastab />
</NavigationContainer>
  );
}