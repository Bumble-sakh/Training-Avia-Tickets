class TicketsUI {
    constructor() {
        this.container = document.querySelector('.tickets-section');
    }

    renderTickets(tickets) {
        this.clearContainer();

        if(!tickets.length) {
            this.showEmptyMsg();
            return;
        }

        let fragment = '';
        tickets.forEach(ticket => {
            const template = TicketsUI.ticketTemplate(ticket);
            fragment += template;            
        });

        this.container.insertAdjacentHTML('afterbegin', fragment);
    }

    clearContainer() {
        this.container.innerHTML = '';
    }

    showEmptyMsg() {
        const template =  TicketsUI.emptyMsgTemplate();
        this.container.insertAdjacentHTML('afterbegin', template);
    }

    static emptyMsgTemplate() {
        return `
        <div class="col-10">
          <div class="bg-secondary py-3 my-3 rounded-3">
            <p class="h5 text-white text-center">No tickets found for your request</p>
          </div>
        </div>
        `;
    }

    static ticketTemplate(ticket) {
        return `
        <div class="col-5 card mx-2 my-2 px-0">

            <div class="card-header">
            <div class="row justify-content-between align-items-center">
                <div class="col-8">
                <p class="h4 my-0">
                    ${ticket.airline_name}
                </p>
                </div>
                <div class="col-4 text-end">
                <img src="${ticket.airline_logo}" alt="Logo">
                </div>
            </div>
            </div>

            <div class="card-body">
            <div class="row justify-content-between align-items-center">
                <div class="col-6 text-start">
                <p class="h2">
                    ${ticket.origin_name}
                </p>
                </div>
                <div class="col-6">
                <p class="h2 text-end">
                    ${ticket.destination_name}
                </p>
                </div>
            </div>
            </div>

            <div class="card-footer">
            <div class="row justify-content-between align-items-center">
                <div class="col-8">
                <p class="text-muted my-0">
                  ${ticket.departure_formated}
                </p>
                <p class="fw-bold my-0">
                    Transfers: ${ticket.transfers} flight: ${ticket.flight_number}
                </p>
                </div>
                <div class="col-4">
                <p class="bg-info my-0 text-center">
                    ${ticket.currency_symbol} ${ticket.price}
                </p>
                </div>
            </div>
            </div>

        </div>
        `;
    }

}

const ticketsUI = new TicketsUI();

export default ticketsUI;