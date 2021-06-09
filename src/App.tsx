import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { LoadingFallback } from './components/LoadingFallback';

/** LazyLoad-Pages */
const Header = lazy(() => import('./components/Header'));
const Home = lazy(() => import('./page'));
const Game = lazy(() => import('./page/game'));
export const App = () => {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<Router>
				<Switch>
					<Header>
						<Redirect to="/home" from="/" />
						<Route exact path="/home" component={Home} />
						<Route exact path="/game" component={Game} />
					</Header>
				</Switch>
			</Router>
		</Suspense>
	);
};
