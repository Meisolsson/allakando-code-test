import { h } from 'preact';
import { render, fireEvent, screen, waitFor } from '@testing-library/preact';

const { SlotRow } = require("../client/routes/slots");

test('booked session are red and has no button', () => {
		const result = render(<SlotRow slot={{ booking_id: 1, start_time: 0, end_time: 1000, id: 5 }} tutor={{ name: 'Test' }} />);
    const element = result.container.children[0]
    expect(element.className).toContain('bg-red')
    expect(result.queryByText('Book')).toBeNull()
});