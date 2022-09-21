import '../App.css';
import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import PhonebookItem from "./PhonebookItem"
import InfiniteScroll from "react-infinite-scroll-component";

export default function PhonebookTable(props) {
    const { loading, error, fetchMore, data } = useQuery(GET_USERS, {
        variables: {
            name: props.searchData.name === undefined ? '' : props.searchData.name,
            alamat: props.searchData.alamat === undefined ? '' : props.searchData.alamat,
            offset: 0,
            limit: 100
        },
    });
    const [list, setList] = useState({
        items: Array.from({ length: 2 })
    });

    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            setList({
                items: list.items.concat(Array.from({ length: 2 }))
            });
        }, 1500);
    };
    // console.log('data diterima', props.searchData)

    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;
    function isiPeta(user) {
        props.fungsi(user)
    }

    return (
        <div>
            <div className="div div-striped">

                <div className="row">
                    <div className="col-md-1"><b>#</b></div>
                    <div className="col"><b>Name</b></div>
                    <div className="col"><b>Phone</b></div>
                    <div className="col"><b>Alamat</b></div>
                    {/* <div className="col"><b>Lat & Long</b></div> */}
                    <div className="col"><b>Actions</b></div>
                </div>
                <hr></hr>
                <InfiniteScroll
                    dataLength={list.items.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                <div>
                    {data &&
                        data.getPhonebooks.map((item, index) => <PhonebookItem
                            key={item.id}
                            index={index}
                            id={item.id}
                            name={item.name}
                            phone={item.phone}
                            latitude={item.latitude}
                            longitude={item.longitude}
                            alamat={item.alamat}
                            searchReset={props.searchReset}
                            fungsi2={isiPeta}
                        />)}
                </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}
