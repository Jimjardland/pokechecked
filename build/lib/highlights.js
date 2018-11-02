"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var got = require("got");
var moment = require("moment");
exports.fetchHighlights = function () { return __awaiter(_this, void 0, void 0, function () {
    var yesterday, today, url, gameData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
                today = moment().format('YYYY-MM-DD');
                url = "https://statsapi.web.nhl.com/api/v1/schedule?startDate=" + yesterday + "&endDate=" + today + "&expand=schedule.teams,schedule.linescore,schedule.broadcasts.all,schedule.ticket,schedule.game.content.media.epg,schedule.radioBroadcasts,schedule.decisions,schedule.scoringplays,schedule.game.content.highlights.scoreboard,team.leaders,schedule.game.seriesSummary,seriesSummary.series&leaderCategories=points,goals,assists&leaderGameTypes=R&site=en_nhlNORDIC&teamId=&gameType=&timecode=";
                return [4 /*yield*/, got(url, { json: true, headers: { 'Content-type': 'application/json' } })];
            case 1:
                gameData = (_a.sent()).body;
                return [2 /*return*/, gameData.dates.map(function (gameDay) {
                        return {
                            day: moment(gameDay.date).format('dddd MMMM Do YYYY'),
                            games: exports.formatGames(gameDay.games)
                        };
                    })];
        }
    });
}); };
exports.formatGames = function (games) {
    return games.map(function (game) {
        var gameIsFinished = game.linescore.currentPeriodTimeRemaining === 'Final';
        return {
            homeTeam: game.teams.home.team.name,
            awayTeam: game.teams.away.team.name,
            homeGoals: game.teams.home.score,
            awayGoals: game.teams.away.score,
            homeWin: game.teams.home.score > game.teams.away.score,
            arena: game.venue.name,
            date: game.gameDate,
            gameIsFinished: gameIsFinished,
            requiredOvertime: gameIsFinished && game.linescore.currentPeriodOrdinal !== '3rd',
            url: exports.getHighlightsUrl(game.content.media.epg)
        };
    });
};
exports.getHighlightsUrl = function (epgs) {
    var videoId;
    for (var i = 0; i < epgs.length; i++) {
        var epg = epgs[i];
        if (epg.items.length) {
            switch (epg.title) {
                case 'Recap':
                    videoId = epg.items[0].mediaPlaybackId || false;
                    break;
                case 'Extended Highlights':
                    videoId = epg.items[0].mediaPlaybackId || false;
                    break;
            }
        }
    }
    return videoId ? "https://www.nhl.com/video/embed/c-" + videoId + "&autoplay=true" : null;
};
