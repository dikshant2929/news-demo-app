import config from "../../../config";
import voteCountMap from "./vote-count-service";

export default class NewsService {
    static getNews({pageNumber, numberOfNewsPerPage = 5}, callback){
        fetch(config.baseUrl + config.newsEndpoint + `page=${pageNumber}&hitsPerPage=${numberOfNewsPerPage}`)
            .then(res => res.json())
            .then(data => callback(null, data))
            .catch(error => callback(error))
    }

    static updateVoteCount(objectId, voteCount){
        voteCountMap[objectId] = voteCount;
    }
}