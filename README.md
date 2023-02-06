# **Проект "Галлерея"**
Frontend проект **"Галлерея"** - это сервис для публикации своих изображений, а также простомтра изображений, загруженных ранее другими пользователями.
___
## Функционал:
1. Загрузка нового изображения на сайт: 
   * Загрузка изображения происходит до открытия модального окна.
   * Есть функция изменения стандартного масштаба изображения.
   * Можно применить один из заранее заготовленных эффектов. Выбор глубины эффекта осуществляется с помощью ползунка noUiSlider.
   * Есть возможность добавить различные шэш-теги для изображения (*до **5** штук*).
   * Можно оставить комментарий к посту.
   * Все выше перечисленное не обязательно для добавления изображения на сайт.
2. Просмотр загруженных изображений:
   * При наведении на изображение показывается общее число комментариев и лайков.
   * Нажав на изображение открывается модальное окно для поста с изображением, его описанием и секцией под комментраии.
   * Изображение можно оценить, нажав на соответствующую кнопку лайка.
   * К посту можно добавить комментарий. 
   * Изначально в модальном окне показывается максимум **5** комментариев. Чтобы отобразить больше комментариев (*при наличии*), нужно нажать на соответственную кнопку
3. Фильтры изображений:
   * Фильтры отображаются только для вошедших пользователей.
   * Изображения в коллекции можно отфильтровать по соответственным категориям: по возрастанию id, по убыванию id, рандомно, по количеству лайков, по количеству     комментариев, по количеству тегов.
   * При выборе фильтра контейнер с изображениями перерисовывается, в соответствии с выбранным фильтром.
   * При нажатии на кнопку "preserved", изображения начинают отображаться в их исходном масштабе. 
5. Аккаунт пользователя:
   * При первом входе открывается модальное окно, предлагающее зарегистрироваться или войти в уже существующий аккаунт.
   * При создании нового аккаунта необходимо ввести уникальный email.
   * После создании нового аккаунта вход в него осуществляется автоматически.
   * Вошедший пользователь может только выйти из текущего аккаунта, нажав на соответствующую кнопку.
___
Команды для запуска и остановки websocket-сервера:
* ./yii worker/index start
* ./yii worker/index stop
Настройки OpenServer:
Настройки > Домены > Ручное + Автропоиск (Имя домена: localhost; Папка домена: до папки web в server)
___
[💾 ***-> ссылка на полное ТЗ проекта <-*** 💾](https://onedrive.live.com/edit.aspx?resid=39696ED78C8F552E!20657&cid=44730dc7-06bf-442f-8db9-f55a7cfbfc50&ithint=file%2cdocx&wdOrigin=OFFICECOM-WEB.START.REC)

Если что, пишите сюда -> ✉ **daniilkru24@gmail.com** ✉
