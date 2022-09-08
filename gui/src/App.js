import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventForm from './components/EventForm';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path={'/event/form'} element={ <EventForm /> } />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
