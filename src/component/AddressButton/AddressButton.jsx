import { useState, useEffect } from "react";
import {
	Container,
	Button,
	Form,
	FormGroup,
	Input,
	Label,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "./AddressComponent.css"; // Ensure the correct path to your CSS file
import { toast } from "react-toastify";
import { getToken } from "../../Utils/TokenManagement.js";
import {
	apiAddAddress,
	apiGetAddress,
	apiDeleteAddress,
	apiUpdateAddress,
} from "../../api/apiAddress";

function AddressListItem({
	address,
	isSelected,
	onSelect,
	onDelete,
	onEdit,
}) {
	const itemClass = isSelected
		? "address-list-item selected"
		: "address-list-item";
	const textClass = isSelected ? "selected-text" : "";

	return (
		<div className={itemClass}>
			<label>
				<Input
					type="radio"
					checked={isSelected}
					onChange={onSelect}
				/>
				<span className={textClass}>
					{address.type}: {address.text}
				</span>
			</label>

			<Button color="success" onClick={onEdit}>
				Edit
			</Button>

			<Button color="danger" onClick={onDelete}>
				Delete
			</Button>
		</div>
	);
}

AddressListItem.propTypes = {
	address: PropTypes.shape({
		type: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
	}),
	isSelected: PropTypes.bool,
	onSelect: PropTypes.func,
	onDelete: PropTypes.func,
	onEdit: PropTypes.func,
	onNew: PropTypes.func,
};

// eslint-disable-next-line react/prop-types
function AddressList({ onClose, setAddress, setIsModalOpen }) {
	const [newAddress, setNewAddress] = useState({
		type: "",
		text: "",
		city: "",
		zipcode: "",
		email: "",
	});

	const [addresses, setAddresses] = useState([]);
	const [selectedAddressId, setSelectedAddressId] = useState(null);
	const [isEditingAddress, setIsEditingAddress] = useState(false);
	const [isAddingAddress, setIsAddingAddress] = useState(false);

	useEffect(() => {
		ShowAddresses();
		// Fetch addresses from the backend when the component mounts
	}, []); // This empty dependency array ensures the effect runs only once

	function ShowAddresses() {
		apiGetAddress()
			.then((res) => {
				if (res.result === true) {
					setAddresses(res.addresses);
				} else {
					// Handle the case where fetching addresses failed
					console.error(
						"Failed to fetch addresses:",
						res.message
					);
				}
			})
			.catch((err) => {
				console.error("An error occurred:", err);
			});
	}
	const handleSelect = (id) => {
		setSelectedAddressId(id);
		setIsEditingAddress(false); // Clear the editing state when selecting a different address
		// Find the selected address by ID
		const selectedAddress = addresses.find(
			(address) => address.id === id
		);
		// Pass the selected address to the setAddress function
		setAddress(selectedAddress);
	};

	const handlePlaceOrder = () => {
		if (selectedAddressId === null) {
			toast.error("Please select an address");
			return;
		}
		onClose();
		setIsModalOpen(true);
	};
	const handleDelete = (id) => {
		// Call the API to delete the address by its ID
		apiDeleteAddress(id)
			.then((res) => {
				if (res.result === true) {
					// If the delete operation was successful, update the state
					const newAddresses = addresses.filter(
						(address) => address.id !== id
					);
					setAddresses(newAddresses);
					setSelectedAddressId(null); // Clear the selected address
					toast.success(res.message); // Display a success message
				} else {
					toast.error(res.message); // Display an error message
				}
			})
			.catch((err) => {
				console.error("An error occurred:", err);
				toast.error(
					"An error occurred while deleting the address."
				);
			});
	};

	const handleEdit = (id) => {
		setSelectedAddressId(id);
		setIsEditingAddress(true);
		// Find the selected address by ID
		const selectedAddress = addresses.find(
			(address) => address.id === id
		);
		setNewAddress(selectedAddress);
	};

	const handleNewAddress = () => {
		setSelectedAddressId(null);
		setIsEditingAddress(false);
		setIsAddingAddress(true);
		setNewAddress({
			type: "",
			text: "",
			city: "",
			zipcode: "",
			email: "",
		});
		ShowAddresses();
	};

	const handleSaveEditedAddress = () => {
		// Validate newAddress fields
		if (
			!newAddress.type ||
			!newAddress.text ||
			!newAddress.city ||
			!newAddress.zipcode ||
			!newAddress.email
		) {
			toast.error("Please fill in all fields.");
			return;
		}

		// Prepare the data to send to the backend
		const data = {
			id: selectedAddressId,
			address: {
				type: newAddress.type,
				text: newAddress.text,
				city: newAddress.city,
				zipcode: newAddress.zipcode,
				email: newAddress.email,
			},
			token: getToken(),
		};

		// Call the API to edit the address
		apiUpdateAddress(data)
			.then((res) => {
				if (res.result === true) {
					// Update the addresses state with the edited address
					const updatedAddresses = addresses.map(
						(address) =>
							address.id === selectedAddressId
								? data.address
								: address
					);
					setAddresses(updatedAddresses);
					setSelectedAddressId(null); // Clear the selected address
					setIsEditingAddress(false); // Exit editing mode
					toast.success(res.message);
				} else {
					// Handle the case where editing the address failed
					toast.error(res.message);
				}
			})
			.catch((err) => {
				console.error("An error occurred:", err);
			});
	};

	function HandleCancel() {
		setIsEditingAddress(false);
		setIsAddingAddress(false);
	}

	const handleApplyNewAddress = () => {
		// Validate newAddress fields
		if (
			!newAddress.type ||
			!newAddress.text ||
			!newAddress.city ||
			!newAddress.zipcode ||
			!newAddress.email
		) {
			toast.error("Please fill in all fields.");
			return;
		}

		// Prepare the data to send to the backend
		const data = {
			address: {
				type: newAddress.type,
				text: newAddress.text,
				city: newAddress.city,
				zipcode: newAddress.zipcode,
				email: newAddress.email,
			},

			token: getToken(),
		};

		// Call the API to add the new address
		apiAddAddress(data)
			.then((res) => {
				if (res.result === true) {
					// Update the addresses state with the new address

					setIsAddingAddress(false);
					toast.success(res.message);
					ShowAddresses();
				} else {
					// Handle the case where adding the address failed
					toast.error(res.message);
				}
			})
			.catch((err) => {
				console.error("An error occurred:", err);
			});
	};

	return (
		<Container className="address-list">
			<h2>
				{isEditingAddress ? "Edit Address" : "Select Address"}
			</h2>
			{isEditingAddress || isAddingAddress ? (
				<Form className="address-form">
					<FormGroup>
						<Label for="type">Type</Label>
						<br />
						<Input
							type="text"
							id="type"
							placeholder="e.g., Home, Work"
							value={newAddress.type}
							onChange={(e) =>
								setNewAddress({
									...newAddress,
									type: e.target.value,
								})
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="address">Address</Label>
						<br />
						<Input
							type="text"
							id="address"
							placeholder="Enter your address"
							value={newAddress.text}
							onChange={(e) =>
								setNewAddress({
									...newAddress,
									text: e.target.value,
								})
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="city">City</Label>
						<br />
						<Input
							type="text"
							id="city"
							placeholder="City"
							value={newAddress.city}
							onChange={(e) =>
								setNewAddress({
									...newAddress,
									city: e.target.value,
								})
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="zipcode">Zip Code</Label>
						<br />
						<Input
							type="text"
							id="zipcode"
							placeholder="Zip Code"
							value={newAddress.zipcode}
							onChange={(e) =>
								setNewAddress({
									...newAddress,
									zipcode: e.target.value,
								})
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<br />
						<Input
							type="email"
							id="email"
							placeholder="Email Address"
							value={newAddress.email}
							onChange={(e) =>
								setNewAddress({
									...newAddress,
									email: e.target.value,
								})
							}
						/>
					</FormGroup>
					{isEditingAddress ? (
						<Button
							color="success"
							onClick={handleSaveEditedAddress}
						>
							<FontAwesomeIcon icon={faMapMarker} />{" "}
							Save
						</Button>
					) : (
						<Button
							color="success"
							onClick={handleApplyNewAddress}
						>
							<FontAwesomeIcon icon={faMapMarker} />{" "}
							Apply
						</Button>
					)}
					<Button color="danger" onClick={HandleCancel}>
						Cancel
					</Button>
				</Form>
			) : (
				<>
					{addresses.map((address) => (
						<AddressListItem
							key={address.id}
							address={address.address}
							isSelected={
								address.id === selectedAddressId
							}
							onSelect={() => handleSelect(address.id)}
							onDelete={() => handleDelete(address.id)}
							onEdit={() => handleEdit(address.id)}
							onNew={handleNewAddress}
						/>
					))}
					<Button
						color="primary"
						className="default-button"
						onClick={handleNewAddress}
					>
						Add New Address
					</Button>
					<Button
						color="primary"
						className="default-button"
						onClick={handlePlaceOrder}
					>
						Place Order
					</Button>
					<Button
						color="danger"
						className="danger-button"
						onClick={onClose}
					>
						Back
					</Button>
				</>
			)}
		</Container>
	);
}

export default AddressList;
