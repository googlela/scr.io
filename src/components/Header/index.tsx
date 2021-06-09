import React, { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

const navigation = [
	{ name: 'Home', href: '/home', current: true },
	{ name: 'game', href: '/game', current: false },
];
function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const Header: React.FC = ({ children }) => {
	const { pathname } = useLocation();

	return (
		<Fragment>
			<Disclosure as="nav" className="bg-blue-900">
				{({ open }) => (
					<>
						<div className="max-w-7xl px-2 sm:px-6 lg:px-8">
							<div className="relative flex items-center justify-between h-20">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<MenuIcon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
								<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start text-white">
									<div className="flex-shrink-0 flex items-center">
										demo
										{/* <img
											className="block lg:hidden h-8 w-auto"
											src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
											alt="Workflow"
										/>
										<img
											className="hidden lg:block h-8 w-auto"
											src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
											alt="Workflow"
										/> */}
									</div>
									<div className="hidden sm:block sm:ml-6">
										<div className="flex space-x-8">
											{navigation?.map((item) => (
												<NavLink
													key={item?.name}
													to={item?.href}
													activeClassName={
														pathname === item?.href ? 'bg-blue-800 text-white' : ''
													}
													className={classNames(
														'text-gray-300 hover:bg-blue-800 hover:text-white',
														'px-4 py-3 rounded-lg text-md font-medium',
													)}
													aria-current={item?.current ? 'page' : undefined}
												>
													{item?.name}
												</NavLink>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden">
							<div className="px-2 pt-2 pb-3 space-y-1">
								{navigation?.map((item) => (
									<NavLink
										key={item?.name}
										to={item?.href}
										activeClassName={pathname === item?.href ? 'bg-blue-800 text-white' : ''}
										className={classNames(
											'text-gray-300 hover:bg-blue-800 hover:text-white',
											'block px-3 py-2 rounded-md text-base font-medium',
										)}
										aria-current={item?.current ? 'page' : undefined}
									>
										{item?.name}
									</NavLink>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>

			<main>
				<div>{children}</div>
			</main>
		</Fragment>
	);
};

export default Header;
