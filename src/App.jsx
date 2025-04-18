import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './table.css'
import axios from 'axios'

function App() {
	const [count, setCount] = useState(0)
	const [products , setProducts] = useState([])
	const [packages , setPackages] = useState([])
	const [selectedItem , setSelectedItem] = useState([])

	const getProduct = async () => {
		axios.get(`${import.meta.env.VITE_API_URL}/api/products`,{headers : {
			'Content-Type' : 'application/json'
		}}).then(response => {
			setProducts(response.data)
		})
	}

	const placeOrder = async () => {
		axios.post(`${import.meta.env.VITE_API_URL}/api/place-order`, {item : selectedItem} ,{headers : {
			'Content-Type' : 'application/json'
		}}).then(response => {
			setPackages(response.data)
		})
	}

	const selectItem = (e) => {
		const { value, checked } = e.target;
		let isAvailable = true
		for (const si of selectedItem){
			if (si == value){
				isAvailable = false
			}
		}


		if (isAvailable) {
			setSelectedItem((prevData) => [...prevData, parseInt(value)]);
		} else {
			
			setSelectedItem((prevData) => prevData.filter((item) => item !== value));
		}

	}


	useEffect(() => {
		getProduct()
	},[])

	useEffect(() => {
		console.log(selectedItem)
	},[selectedItem])

	return (
		<>
			<div style={{ width : '500px', overflowV : 'scroll' }}>
				<table className="products">
					<thead>
						<tr>
							<td>Name</td>
							<td>Price</td>
							<td>Weight</td>
							<td>Select</td>
						</tr>
					</thead>
					<tbody>
						{products.length > 0 ? (
							products.map((v,i) => (
								<tr key={i}>
									<td>{ v.name }</td>
									<td>{ v.price }</td>
									<td>{ v.weight }</td>
									<td><input type="checkbox" value={v.ID} onChange={selectItem}/></td>
								</tr>
							))
						) : (
							<tr>
								<td>1</td>
								<td>1</td>
								<td>1</td>
								<td>1</td>
							</tr>
						)}
						
					</tbody>
				</table>
			</div>
			<div style={{marginTop : '30px'}}>
				<button onClick={placeOrder}>Place Order</button>
			</div>
			<div style={{marginTop : '40px'}}>
				{packages.length > 0 ? (
					packages.map((value , index) => (
						<div key={index}>
							<h3>{value.name}</h3>
							<h4>Courier Charge: {value.courier_charges}</h4>
							{value.package_item.length > 0 ? (
								value.package_item.map((pi, pi_idx) => (
									<ul>
										<li>Name : {pi.item_name}</li>
										<li>Price : {pi.item_price}</li>
										<li>Weight : {pi.item_weight}</li>
									</ul>									
								))
							) : ('-')}
							
						</div>
					))
				) : ('-')}
			</div>
		</>
	)
}

export default App
