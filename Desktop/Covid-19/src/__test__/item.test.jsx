const { render, screen } = require("@testing-library/react");
import Item from '../page/home/item';



test("gönderilen proplar doğru şekilde kullanılır",()=>{

    render(<Item color="text-blue-500" text="Toplam Test" value={"339M"} />);

    const icon = screen.getByTestId("icon");

    expect(icon).toHaveClass("text-blue-500");


    const h2 = screen.getByRole("heading");
    expect(h2).toHaveTextContent("339M");

    screen.getByText("Toplam Test");


});