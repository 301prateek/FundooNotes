import Axios from './axiosService';

const httpService = new Axios();

export default class noteService {

    baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api"

    addNote = (data, token) => {
        return httpService.Post(`${this.baseUrl}/notes/addNotes`, data,{
            headers: {
              Authorization: `${token}`,
            },
          });
    }

    getNotes = () => {
      let token = localStorage.getItem("userToken");
      return httpService.Get(`${this.baseUrl}/notes/getNotesList`,{
        headers: {
          Authorization: `${token}`,
        },
      });
    }

    deleteNote = (data, token) => {
        return httpService.Post(`${this.baseUrl}/notes/trashNotes`, data,{
            headers: {
              Authorization: `${token}`,
            },
          });
    }

    archiveNote = (data, token) => {
      return httpService.Post(`${this.baseUrl}/notes/archiveNotes`, data,{
        headers: {
          Authorization: `${token}`,
        },
      });
    }

    updateNote = (data, token) => {
      return  httpService.Post(`${this.baseUrl}/notes/updateNotes`, data,{
        headers: {
          Authorization: `${token}`,
        },
      });
    }

    updateColor = (data,token) => {
      return  httpService.Post(`${this.baseUrl}/notes/changesColorNotes`, data,{
        headers: {
          Authorization: `${token}`,
        },
      });
    }
}