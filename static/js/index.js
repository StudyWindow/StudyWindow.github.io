import {init,get_supabase_instance,subscribe_to_auto_gif_refresh } from '/static/js/utils/utility.js'
import {LOGIN_N_SIGNUP,STREAMS,FAV_STREAMS,LEADERBOARD,ABOUT} from '/static/js/src/strings.js';

import auth_user from '/static/js/src/auth.js'
import create_streams from '/static/js/src/streams.js'
import create_fav_streams from '/static/js/src/favorites.js'
import create_leaderboard from '/static/js/src/leaderboard.js'
import config_global from '/static/js/utils/globals.js'


const sw_streams=document.getElementById('streams')
const sw_fav_streams=document.getElementById("favorites")
const leaderboard = document.getElementById('leaderboard')
const sw_about =document.getElementById('about')

const supabase = get_supabase_instance()

init(supabase)
//add all template html
sw_streams.innerHTML=STREAMS
sw_fav_streams.innerHTML=FAV_STREAMS
leaderboard.innerHTML=LEADERBOARD
sw_about.innerHTML=ABOUT

create_streams(supabase)
create_fav_streams(supabase)
create_leaderboard(supabase)
