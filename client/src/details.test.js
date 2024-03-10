import { render, screen } from "@testing-library/react";
import Detail from "./Detail/Detail";

test('Detail component renders correctly', () => { 
    render(<Detail/>);

    const detailTitle = screen.getByText(/รายละเอียดทัวร์/);
    expect(detailTitle).toBeInTheDocument();

    const createButton = screen.getByText(/Create/);
    expect(createButton).toBeInTheDocument();
});
