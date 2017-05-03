$(document).ready(function () {
// Группы объектов
    var groups = [
        {
            name: "Пункты выдачи заказов ЦМРТ ОРТО:",
            style: "islands#blueIcon",
            items: [
                {
                    center: [59.985407999990976, 30.265212661376932],
                    ytype: "Магазин на базе",
                    name: "ЦМРТ Старая Деревня",
                    metro: "Старая Деревня",
                    content:"ул. Дибуновская, д. 45",
                    time: "пн-вс 9:00 - 21:00",
                    deliv: "1-2 дня",
                    price: "доставка бесплатная"
                },
                {
                    center: [59.96364718347366, 30.31981381880189],
                    ytype: "Магазин на базе",
                    name: "ЦМРТ Петроградский",
                    metro: "Петроградская",
                    content:"ул. Рентгена, д. 5",
                    time: "пн-вс 9:00 - 21:00",
                    deliv: "1-2 дня",
                    price: "доставка бесплатная"
                },
                {
                    center: [59.90159567390066,30.284458119049045],
                    ytype: "Магазин на базе",
                    name: "ЦМРТ Нарвский",
                    metro: "Нарвская",
                    content:"ул. Ивана Черных, д. 29",
                    time: "пн-вс 9:00 - 21:00",
                    deliv: "1-2 дня",
                    price: "доставка бесплатная"
                },
                {
                    center: [60.041910132816035,30.315507271163906],
                    ytype: "Магазин на базе",
                    name: "ЦМРТ Озерки ",
                    metro: "Озерки",
                    content:"Выборгское шоссе, д. 40",
                    time: "пн-вс 9:00 - 21:00",
                    deliv: "1-2 дня",
                    price: "доставка бесплатная"
                },
                {
                    center: [59.94800881931565,30.35778281481931],
                    ytype: "Магазин на базе",
                    name: "ЦМРТ Чернышевская",
                    metro: "Чернышевская",
                    content:"ул. Захарьевская, д. 14",
                    time: "Ежедневно 9:00 - 22:00",
                    deliv: "1-2 дня",
                    price: "доставка бесплатная"
                }
            ]}
    ];



    ymaps.ready(init);

    function init() {

        // Создание экземпляра карты.
        var myMap = new ymaps.Map('map', {
                center: [59.94800881931565,30.35778281481931],
                zoom: 10,
                controls: ['zoomControl', 'typeSelector',  'fullscreenControl', 'geolocationControl']
            }, {
                searchControlProvider: 'yandex#search'
            });

        // Контейнер для меню.
        menu = $('<ul class="geoMap_menu"></ul>');

        for (var i = 0, l = groups.length; i < l; i++) {
            createMenuGroup(groups[i]);
        }

        function createMenuGroup (group) {
            // Пункт меню.
            var menuItem = $('<li class="geoMap_menu_group"><span>' + group.name + '</span></li>'),
            // Коллекция для геообъектов группы.
                collection = new ymaps.GeoObjectCollection(null, { preset: group.style }),
            // Контейнер для подменю.
                submenu = $('<ul class="geoMap_submenu"></ul>');

            // Добавляем коллекцию на карту.
            myMap.geoObjects.add(collection);

            // Добавляем подменю.
            menuItem
                .append(submenu)
                // Добавляем пункт в меню.
                .appendTo(menu)
            // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
            // .find('a')
            // .bind('click', function () {
            //     if (collection.getParent()) {
            //         myMap.geoObjects.remove(collection);
            //         submenu.hide();
            //     } else {
            //         myMap.geoObjects.add(collection);
            //         submenu.show();
            //     }
            // });
            for (var j = 0, m = group.items.length; j < m; j++) {
                createSubMenu(group.items[j], collection, submenu);
            }
        }

        function createSubMenu (item, collection, submenu) {

            // Пункт подменю.
            var submenuItem = $('<li class="geoMap_submenu_item" ><a href="#" id="bt_'+i+'"><span class="geoMap_submenu_name">' + item.name + '</span><span class="geoMap_submenu_content">' + 'ст. м. ' + item.metro +  ', ' + item.content + '</span><span class="geoMap_submenu_time"><span>' + item.time + '</span></span></a></li>'),
            // Создаем метку.
                placemark = new ymaps.Placemark(item.center, { balloonContent:
                 '<div class="ymap_content">' + 
                    '<div class="ymap_header">' + item.ytype + ' ' + item.name + '</div>' + 
                    '<div class="ymap_adr">' + 'Адрес: ' + '<b>' + item.content + '</b></div>' + 
                    '<div class="ymap_metro">' + 'Метро: ' + '<b>' + item.metro + '</b></div>' +
                    '<div class="ymap_deliv">' + 'Срок доставки: ' + '<b>' + item.deliv + '</b></div>' +
                    '<div class="ymap_rejim">' + 'Режим работы: ' + '<b>' + item.time + '</b></div>' +
                    '<div class="ymap_price">' + 'Цена: ' + '<b>' + item.price + '</b></div>' +
                '</div>' });

            // Добавляем метку в коллекцию.
            collection.add(placemark);

            // Добавляем пункт в подменю.
            submenuItem
                .appendTo(submenu)
                // При клике по пункту подменю открываем/закрываем баллун у метки, добавляем активные классы и перемещаемся по карте.
                .find('a')
                .on('click', function(e) {
                     e.preventDefault();
                     submenuItem
                         .toggleClass('active')
                         .siblings('.active')
                         .removeClass('active');
                    if (!placemark.balloon.isOpen()) {
                        myMap.panTo(placemark.geometry.getCoordinates(),{
                            delay:0
                        });
                        myMap.setCenter(placemark.geometry.getCoordinates());
                        myMap.setZoom(15);
                        placemark.balloon.open();
                    } else {
                        myMap.setBounds(myMap.geoObjects.getBounds(), myMap.setZoom(10));
                        placemark.balloon.close();

                    }
                    return false;
                });

            // При открытии метки добавляем активный класс к соотвествующему пункту меню и убираем лишние классы, если
            // это необходимо, делаем зум карты и центрируем её
            placemark.events.add('balloonopen', function(e){
                console.log('blah class added');
                myMap.panTo(placemark.geometry.getCoordinates(),{
                    delay:0
                });
                myMap.setCenter(placemark.geometry.getCoordinates());
                myMap.setZoom(15);
                submenuItem
                    .addClass('active')
                    .sibling('.active')
                    .removeClass('active');
            });

            // При закрытии баллуна отдаляем карту и убираем активные классы у всего
            placemark.events.add('balloonclose', function(e){
                myMap.setZoom(10);
                myMap.setBounds(myMap.geoObjects.getBounds());
                submenuItem
                    .removeClass('active');
            });
        }

        // Добавляем меню в блок с нужным ID.
        menu.appendTo($('#map_menu_wrap'));
        // Выставляем масштаб карты чтобы были видны все группы.
        myMap.setBounds(myMap.geoObjects.getBounds());
    }

});





