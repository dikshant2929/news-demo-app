import React, { useEffect, useState } from "react";
import { LineChart } from "../../components/LineChart";
import Pagination from "../../components/Pagination";
import NewsService from "./services/news-service";
import voteCountMap from "./services/vote-count-service";

const NewsList = () => {

    const [newsList, setNewsList] = useState([]);
    const [pageNumber, setPageNumber] = useState(history?.state?.page || 0);
    const [maximumPageCount, setMaximumPageCount] = useState(0);
    const [numberOfNewsPerPage, setNumberOfNewsPerPage] = useState(5);

    useEffect(() => {
        history.pushState({ page: pageNumber }, 'page', `?page=${pageNumber}`);
        NewsService.getNews({ pageNumber, numberOfNewsPerPage }, (error, data) => {
            console.log(data);
            setNewsList(data?.hits);
        })
    }, [pageNumber, numberOfNewsPerPage]);

    const onNewsRemoved = (id) => {
        setNewsList(previous => {
            return previous.filter(item => item.objectID !== id);
        });
    }

    const onPageChange = (nextPageNumber) => {
        setPageNumber(nextPageNumber);
    }

    const increaseUpVote = (id, actualVoteCount) => {
        NewsService.updateVoteCount(id, actualVoteCount + 1);
        setNewsList(previous => {
            return previous.map(item => {
                if(item.objectID === id){
                    item.vote_count = actualVoteCount + 1
                };
                return item;
            });
        });
    }

    const getLabelValue = () => {
        // const graphSetList = newsList.filter(item => Boolean(item.vote_count));
        return Object.keys(voteCountMap);
    }

    return (
        <div className="flex justify-center items-center text-left mt-4 flex-col container">
            <table class="md:table-fixed w-4/5">
                <thead className="bg-orange-500 text-white">
                    <tr>
                        <th className="px-2" width="15%">Comments</th>
                        <th className="px-2" width="15%">Vote Count</th>
                        <th className="px-2" width="15%">UpVotes</th>
                        <th className="px-2" width="45%">News Details</th>
                        <th className="px-2" width="10%">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {newsList.map((item, index) => {
                        return (
                            <tr key={item.objectID} className={index % 2 == 0 ? 'bg-yellow-200' : 'bg-yellow-500'}>
                                <td className="px-2">{item.num_comments}</td>
                                <td className="px-2">{item.vote_count || voteCountMap[item.objectID] ||0}</td>
                                <td className="px-2 cursor-pointer" onClick={() => increaseUpVote(item.objectID, item.vote_count || 0)}>Up</td>
                                <td className="px-2">{item.title}</td>
                                <td className="px-2 cursor-pointer text-red-600"><span onClick={() => onNewsRemoved(item.objectID)}>Remove</span></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {newsList.length !== 0 && <div className="w-4/5 mt-4">
                <Pagination currentPageNumber={pageNumber} onNextPreviousClicked={onPageChange} selectedValue={numberOfNewsPerPage} setSelectedValue={setNumberOfNewsPerPage} />
            </div>}

            {newsList.length !== 0 && <div className="w-4/5 mt-4 mx-auto">
                <LineChart label={getLabelValue()} />
            </div>}
        </div>
    )
}

export default NewsList;