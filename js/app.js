function get_user_info(event)
{
    reset_info_on_screen();

    axios.request(
        {
            url: `https://reqres.in/api/users`
        }
    ).then(get_success).catch(get_error);
}

function get_success(res)
{
    for(let i = 0; i < res[`data`][`data`].length; i++)
    {
        document.querySelector(`#user_section`).insertAdjacentHTML(`beforeend`,
        `<article class="employee_card">
            <img src="${res[`data`][`data`][i][`avatar`]}" alt="">
            <h3>${res[`data`][`data`][i][`first_name`]} ${res[`data`][`data`][i][`last_name`]}</h3>    
            <p>${res[`data`][`data`][i][`email`]}</p>
        </article>`);
    }
}

function get_error(err)
{
    display_error_message(`There was an error`);
}

function post_employee_info(event)
{

    reset_info_on_screen();

    let employee_name = document.querySelector(`#employee_name_field`)[`value`];
    let employee_job = document.querySelector(`#employee_job_field`)[`value`];

    axios.request(
        {
            method: `POST`,
            url: `https://reqres.in/api/users`,
            data: 
            {
                name: employee_name,
                job: employee_job
            }
        }
    ).then(submit_employee_success).catch(submit_employee_error);
}

function submit_employee_success(res)
{
    document.querySelector(`#user_section`).insertAdjacentHTML(`beforeend`, 
    `<article class="employee_card">
        <h3>New Employee Information Posted</h3>
        <h3>${res[`data`][`name`]} : ${res[`data`][`job`]}</h3>
        <p>${res[`data`][`id`]}</p>
        <p>${res[`data`][`createdAt`]}</p>
    </article>`);
}

function submit_employee_error(err)
{
    display_error_message(`There was an error`);
}

function display_error_message(message)
{
    document.querySelector(`#user_section`).insertAdjacentHTML(`afterbegin`, 
    `<h2 id="error_message">${message}</h2>`);
}

function reset_info_on_screen(event)
{
    if(document.querySelectorAll(`.employee_card`))
    {
        for(let i = document.querySelectorAll(`.employee_card`).length - 1; i >= 0 ; i--)
        {
            document.querySelectorAll(`.employee_card`)[i].remove();
        }
    }

    if(document.querySelector(`#error_message`))
    {
        document.querySelector(`#error_message`).remove();
    }
}

let btn = document.querySelector(`#req_btn`);
btn.addEventListener(`click`, get_user_info);
let submit_button = document.querySelector(`#submit_employee`);
submit_button.addEventListener(`click`, post_employee_info);