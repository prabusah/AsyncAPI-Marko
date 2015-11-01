/*function Widget() {
	var iStates = ["Assam", "Bihar", "Chandigarh", "Delhi", "Goa", "Gujarat", "Haryana", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Punjab", "Rajasthan", "Sikkim", "Uttarakhand"];
    var el = this.el;
    var messageEl = this.getEl('message');
    messageEl.innerHTML = 'Tap/click this box to see other State/UT info';
    el.addEventListener('click', function() {
        el.style.backgroundColor = '#2c3e50';
        var random = Math.floor(Math.random() * 19);
        var href = window.location.href.split("?")[0];
        var url = href+'?state='+ iStates[random];
        window.open(url, '_self');
    });
}

module.exports = Widget;*/