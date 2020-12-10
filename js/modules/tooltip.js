export default function initTooltip() {
    const tooltips = document.querySelectorAll('[data-tooltip]');

    function criarTooltipBox(element) {
        const tooltipBox = document.createElement('div');
        const text = element.getAttribute('aria-label');

        tooltipBox.classList.add('tooltip');
        tooltipBox.innerText = text;
        document.body.appendChild(tooltipBox);

        return tooltipBox;
    }

    const onMouseMove = {
        handleEvent(event) {
            this.tooltipBox.style.top = `${event.pageY + 12}px`;
            this.tooltipBox.style.left = `${event.pageX + 12}px`;
        },
    };

    const onMouseLeave = {
        // tooltipBox: '',
        // element: '',
        handleEvent() {
            this.tooltipBox.remove();
            this.element.removeEventListener('mouseleave', onMouseLeave); // para remover o evento quando tirar o mouse do mapa
            this.element.removeEventListener('mousemove', onMouseMove);
        },
    };

    function onMouseOver() {
        const tooltipBox = criarTooltipBox(this);

        onMouseMove.tooltipBox = tooltipBox;
        this.addEventListener('mousemove', onMouseMove);

        onMouseLeave.tooltipBox = tooltipBox;
        onMouseLeave.element = this;
        this.addEventListener('mouseleave', onMouseLeave);
    }

    tooltips.forEach((item) => {
        item.addEventListener('mouseover', onMouseOver);
    });
}
