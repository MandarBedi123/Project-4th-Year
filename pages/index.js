import React, { useState, useEffect, useContext } from 'react'

//INTERNAL IMPORT
import {
	Table,
	Form,
	Services,
	Profile,
	CompleteShipment,
	GetShipment,
	StartShipment,
} from '../Components/index'
import { TrackingContext } from '../Conetxt/TrackingContext'
import Link from 'next/link'

const index = () => {
	const {
		currentUser,
		createShipment,
		getAllShipment,
		completeShipment,
		getShipment,
		startShipment,
		getShipmentsCount,
	} = useContext(TrackingContext)

	//STATE VARIABLE
	const [createShipmentModel, setCreateShipmentModel] = useState(false)
	const [openProfile, setOpenProfile] = useState(false)
	const [startModal, setStartModal] = useState(false)
	const [completeModal, setCompleteModal] = useState(false)
	const [getModel, setGetModel] = useState(false)
	//DATA STATE VARIABLE
	const [allShipmentsdata, setallShipmentsdata] = useState()

	useEffect(() => {
		const getCampaignsData = getAllShipment()

		return async () => {
			const allData = await getCampaignsData
			setallShipmentsdata(allData)
		}
	}, [])

	return (
		<>
			<div
				className="hero min-h-screen"
				style={{
					background:
						'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
				}}
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Hello there</h1>
						<p className="mb-5">
							This application helps track shipment records on the
							blockchain. Through this application, you can
							create, track, and complete a shipment.
							Additionally, there are a few quality of life
							features such as a user profile and a data table to
							view the shipments in an organised manner.
						</p>
						<Link href={'#main'} scroll={false}>
							<button className="btn btn-outline">
								Get Started
							</button>
						</Link>
					</div>
				</div>
			</div>
			<Services
				setOpenProfile={setOpenProfile}
				setCompleteModal={setCompleteModal}
				setGetModel={setGetModel}
				setStartModal={setStartModal}
			/>

			<Table
				setCreateShipmentModel={setCreateShipmentModel}
				allShipmentsdata={allShipmentsdata}
			/>
			<Form
				createShipmentModel={createShipmentModel}
				createShipment={createShipment}
				setCreateShipmentModel={setCreateShipmentModel}
			/>
			<Profile
				openProfile={openProfile}
				setOpenProfile={setOpenProfile}
				currentUser={currentUser}
				getShipmentsCount={getShipmentsCount}
			/>
			<CompleteShipment
				completeModal={completeModal}
				setCompleteModal={setCompleteModal}
				completeShipment={completeShipment}
			/>
			<GetShipment
				getModel={getModel}
				setGetModel={setGetModel}
				getShipment={getShipment}
			/>
			<StartShipment
				startModal={startModal}
				setStartModal={setStartModal}
				startShipment={startShipment}
			/>
		</>
	)
}

export default index
