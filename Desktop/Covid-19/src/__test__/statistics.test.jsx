const { render, screen, waitFor } = require("@testing-library/react")
import millify from 'millify';
import Statistics from '../page/home/statistics';
import { totalApi } from '../util/api';
import { totalData } from '../util/constants';



jest.mock("../util/api", () => ({
    totalApi: { get: jest.fn() },
  }));
  
  

describe("istatistik component testler",()=>{

    beforeEach(()=>{
        jest.clearAllMocks();
    });





    test("bileşen render olunca ekrana loader gelir",()=>{
        totalApi.get.mockReturnValue(new Promise(() => {}));

        render(<Statistics/>);

        screen.getByTestId("loader");

    });




    test(" apiden hata gelince ekrana hata mesajı basılır ",async()=>{

        totalApi.get.mockRejectedValue(new Error("404 hatası"));  
        
        render(<Statistics/>);
        

        await waitFor(() => screen.getByText("Üzgünüz bir sorun oluştu"));


       
    });



    test(" apiden cevap gelince ekrana veriler basılır ", async()=>{

        totalApi.get.mockResolvedValue({ data: { data: totalData } });


        render(<Statistics/>);


        await waitFor(()=> expect(totalApi.get).toHaveBeenCalled());

        screen.getByText(millify(totalData.confirmed));
        screen.getByText(millify(totalData.active));
        screen.getByText(millify(totalData.deaths));




    });





})