export default class Tooltip {
    constructor(tooltips) {
        this.tooltips = document.querySelectorAll(tooltips);

        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
    }

    onMouseMove(event) {
        this.tooltipBox.style.top = `${event.pageY + 12}px`;
        if (event.pageX + 240 > window.innerWidth) {
            this.tooltipBox.style.left = `${event.pageX - 180}px`;
        } else {
            this.tooltipBox.style.left = `${event.pageX + 12}px`;
        }
    };

    onMouseLeave({ currentTarget }) {
        this.tooltipBox.remove();

        // remover o event quando tirar o mouse do mapa
        currentTarget.removeEventListener('mouseleave', this.onMouseLeave);
        currentTarget.removeEventListener('mousemove', this.onMouseMove);
    };

    criarTooltipBox(element) {
        const tooltipBox = document.createElement('div');
        const text = element.getAttribute('aria-label');

        tooltipBox.classList.add('tooltip');
        tooltipBox.innerText = text;
        document.body.appendChild(tooltipBox);

        this.tooltipBox = tooltipBox;
    }

    onMouseOver({ currentTarget }) {
        // cria a tooltipoBox e coloca em uma proriedade
        this.criarTooltipBox(currentTarget);

        currentTarget.addEventListener('mousemove', this.onMouseMove);
        currentTarget.addEventListener('mouseleave', this.onMouseLeave);
    }

    addTooltipsEvent() {
        this.tooltips.forEach((item) => {
            item.addEventListener('mouseover', this.onMouseOver);
        });
    }

    init() {
        if (this.tooltips.length) {
            this.addTooltipsEvent();
        }
        return this;
    }
}
