# **Проект "Галлерея"**
Frontend проект **"Галлерея"** - это сервис для публикации своих изображений, а также простомтра изображений, загруженных ранее другими пользователями.
___
## Функционал:
1. Загрузка нового изображения на сайт: 
   * Загрузка изображения происходит до открытия модального окна.
   * Есть функция изменения стандартного масштаба изображения.
   * Можно применить один из заранее заготовленных эффектов. Выбор глубины эффекта осуществляется с помощью ползунка.
   * Есть возможность добавить различные шэш-теги для изображения (*до **5** штук*).
   * Можно оставить комментарий к посту.
   * Все выше перечисленное не обязательно для добавления изображения на сайт.
2. Просмотр загруженных изображений:
   * При наведении на изображение показывается общее число комментариев и лайков.
   * Нажав на изображение открывается модальное окно для поста с изображением, его описанием и секцией под комментраии.
   * Изначально в модальном окне показывается максимум **5** комментариев. Чтобы отобразить больше комментариев (*при наличии*), нужно нажать на соответственную кнопку.
3. Дополнительные функции:
   * **JS** код принимает (*создает*) базу данных с информацией о постах (*фото, описание, лайки и коментарии*), которая заполняется в **html** шаблон.
      ```
      generatePicsArray(getRandomInt(10, 100);
      ```
   * Можно настраивать размер контейнера и ячеек, и по сколько в ряду они будут находиться. Кнопка "**добавить**" всегда будет выравниваться по центру.
      ```
      createDesk(picsArray, containerWidth, RowSize, containerMargin);
      ```
   * Есть возможность фильтрации постов по определенным катигориям.
___
[💾 ***-> ссылка на полное ТЗ проекта <-*** 💾](https://onedrive.live.com/edit.aspx?resid=39696ED78C8F552E!20657&cid=44730dc7-06bf-442f-8db9-f55a7cfbfc50&ithint=file%2cdocx&wdOrigin=OFFICECOM-WEB.START.REC)

Если что, пишите сюда -> ✉ **daniilkru24@gmail.com** ✉