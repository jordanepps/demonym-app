import React from 'react';
import './Demonym.css';

export default function Demonym(props) {
	return (
		<div className="demonym">
			A {props.name} comes from {props.country}
		</div>
	);
}
