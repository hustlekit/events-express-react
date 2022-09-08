import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EventForm from './components/EventForm';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path={'/event/form'} element={ <EventForm /> } />
					<Route path={'/'} element={ <Navigate to="/event/form" /> } />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
