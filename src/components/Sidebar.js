import React from 'react';
import { ListGroup } from "react-bootstrap"

function Sidebar() {

    const rooms = ["First Room", "Second Room", "Third Room", "Fourth Room"]
    return (
    <>
        <h2>Available Rooms</h2>
        <ListGroup>
            {rooms.map((room, idx) => (
                <ListGroup.Item key={idx}>{room} </ListGroup.Item>
            ))}
        </ListGroup>]

        <h2>Memebers</h2>
        {/* <ListGroup>
            {rooms.map((room, idx) => (
                <ListGroup.Item key={idx}>{room} </ListGroup.Item>
            ))}
        </ListGroup>] */}



    </>
    )
}

export default Sidebar